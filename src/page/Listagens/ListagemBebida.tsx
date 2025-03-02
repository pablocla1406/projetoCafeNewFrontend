import GenericTable from "@/components/table/tableGenerica";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bebidaService } from "@/service/BebidaService";
import debounce from "@/utils/functions/debounce";
import AnimatedComponentsScroll from "@/utils/functions/rolagemComEfeitos/animatedComponentsScroll";
import IBebida from "@/utils/interfaces/IBebida";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck, BadgeX, Coffee, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListagemBebida(){
    const [bebidas, SetBebidas] = useState<IBebida[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<Record<string, string>>({});
    const [isAnimating, setAnimating] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('');

    async function fetchData(page: number = 1, currentFilters: Record<string, string> = {}) {
        const { data, totalPages } = await bebidaService.listarDadosListagem(currentFilters, page, 12);

        SetBebidas(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        fetchData(currentPage, filters);
    }, [currentPage, filters]);


    async function buscarPorStatusAtivo(statusEscolhido: string) {
        try {
            setStatusFilter(statusEscolhido);
            const filterAtualizado = { ...filters, status: statusEscolhido };
            await fetchData(currentPage, filterAtualizado);   
        } catch (error) {
            toast.error('Erro ao buscar bebidas ativas');
            throw error;
        }
    }

    async function handleDelete(id: string){
        try {
            await bebidaService.deletarDadosId(id);
            const dadosAposExclusao = bebidas.filter(bebida => bebida.id !== id);
            SetBebidas(dadosAposExclusao);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Erro ao excluir bebida';
            toast.error(errorMessage);
            throw error;
        }
    }

    async function handleDeleteUndo(BebidaExcluidaId: string) {
        try {
            await bebidaService.restaurarRegistro(BebidaExcluidaId);
            fetchData(currentPage, filters); 
        } catch (error) {
            console.error(error);
        }
    }

    const handleFilter = React.useCallback(
        debounce((newFilters: Record<string, string>) => {
            if (!newFilters.status) {
                setStatusFilter('');
            }
            SetCurrentPage(1);
            SetFilters(newFilters);
        }, 800),
        []
    );

    async function ativarInativarStatus(id: string) {
        try {
            setAnimating(id);
            await bebidaService.ativarOuInativarRegisto(id);
            await fetchData(currentPage, filters); 
        } catch (error) {
            toast.error('Erro ao ativar ou inativar status');
        } finally {
            setTimeout(() => setAnimating(null), 1000);
        }
    }

    const filtrosAdicionaisBebidas = [
        {
            key: 'status',
            label: 'Status',
            render: () =>
                <div className="w-full">
                    <Select value={statusFilter} onValueChange={(value) => buscarPorStatusAtivo(value)}>

                        <SelectTrigger className="hover:text-[#4a3f35] hover:bg-white">
                            <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <div className="flex flex-row">
        
                        <SelectContent>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                        </SelectContent>
                        
                        </div>
                    </Select>

                </div>
        }
    ]

    const columnsBebidas = [
        {
            key: 'imagem',
            header: 'Imagem',
            render: (value: any) =>
                <div className="flex justify-center items-center">
                    <Avatar>
                        <AvatarImage src={value} className="h-10 w-10 rounded-full" />
                        <AvatarFallback>
                            <Coffee className="h-10 w-10 text-muted-foreground " />
                        </AvatarFallback>
                    </Avatar>
                </div>
            ,
            filterable: false,
        },
        {
            key: 'nome',
            header:'Nome',
            filterable: true
        },
        {
            key: 'preco',
            header: 'Preço',
            filterable: false,
            render: (value: string | number) => {
                const valorComDecimal = parseFloat(value as string).toFixed(2);
                return `R$ ${valorComDecimal}`;

            },
        },  
        {
            key: 'id',
            header: 'Status',
            render: (value: string) => {
                const bebida = bebidas.find(b => b.id === value);
                const isAnimatingButton = isAnimating === value;
                
                return (
                    <div className="flex justify-center items-center">
                        {bebida?.status === 'Inativo' ? (
                            <div 
                                className={`p-2 cursor-pointer transition-all duration-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/50 ${isAnimatingButton ? 'animate-spin-once bg-red-100 dark:bg-red-950' : ''}`}
                                onClick={() => !isAnimatingButton && ativarInativarStatus(value)}
                            >
                                <BadgeX className={`text-red-500 ${isAnimatingButton ? 'scale-110' : ''}`} />
                            </div>
                        ) : (
                            <div 
                                className={`p-2 cursor-pointer transition-all duration-500 rounded-full hover:bg-green-50 dark:hover:bg-green-950/50 ${isAnimatingButton ? 'animate-spin-once bg-green-100 dark:bg-green-950' : ''}`}
                                onClick={() => !isAnimatingButton && ativarInativarStatus(value)}
                            >
                                <BadgeCheck className={`text-green-500 ${isAnimatingButton ? 'scale-110' : ''}`} />
                            </div>
                        )}
                    </div>
                )
            },
            filterable: false
        }
    ]


    return(


        <AnimatedComponentsScroll idDiv="bebidas-scroll">
        <GenericTable
        cadHref="cadastroBebida"
        data={bebidas}
        columns={columnsBebidas}
        href="cadastroBebida"
        onDelete={handleDelete}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        onDeleteUndo={handleDeleteUndo} 
        NomeListagem="Bebidas"
        textoAdicionalEmFiltros="Bebidas com o status 'inativo' não estarão disponíveis para seleção ao criar um pedido"
        filtrosAdicionais={filtrosAdicionaisBebidas}
        />
        </AnimatedComponentsScroll>


    )

}