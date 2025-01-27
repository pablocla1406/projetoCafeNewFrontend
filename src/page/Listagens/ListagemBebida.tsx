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
            fetchData(currentPage, filters); // Refresh the page data
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

             await bebidaService.ativarOuInativarRegisto(id);
            fetchData(currentPage, filters); 
        } catch (error) {
            toast.error('Erro ao ativar ou inativar status');
            
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
            key: 'status',
            header: 'Ativo',
            render: (value: string) => (
                <div className="flex justify-center items-center">
                    {value === 'Inativo' ? (
                        <Button variant="outline" onClick={() => ativarInativarStatus(value)}>
                            <BadgeX className="text-red-500 text-lg" />
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={() => ativarInativarStatus(value)}>
                            <BadgeCheck className="text-green-500 text-lg" />
                        </Button>
                    )}
                </div>
            ),
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
        />


    )

}