import GenericTable from "@/components/table/tableGenerica";
import { Button } from "@/components/ui/button";
import { bebidaService } from "@/service/BebidaService";
import debounce from "@/utils/functions/debounce";
import IBebida from "@/utils/interfaces/IBebida";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck, BadgeX, Coffee } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListagemBebida(){
    const [bebidas, SetBebidas] = useState<IBebida[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<Record<string, string>>({});
    const [isAnimating, setAnimating] = useState<string | null>(null);

    async function fetchData(page: number = 1, currentFilters: Record<string, string> = {}) {
        const { data, totalPages } = await bebidaService.listarDadosListagem(currentFilters, page, 12);

        SetBebidas(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        fetchData(currentPage, filters);
    }, [currentPage, filters]);


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
            keySubstituta: 'status',
            headerSubstituta: 'Status',
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
            filterable: true
        }
    ]


    return(
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
        />


    )

}