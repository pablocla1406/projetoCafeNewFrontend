import GenericTable from "@/components/table/tableGenerica";
import { bebidaService } from "@/service/BebidaService";
import debounce from "@/utils/functions/debounce";
import IBebida from "@/utils/interfaces/IBebida";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Coffee, Key } from "lucide-react";
import React, { useEffect, useState } from "react";

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
        await bebidaService.deletarDadosId(id);
        const dadosAposExclusao = bebidas.filter(bebida => bebida.id !== id);
        SetBebidas(dadosAposExclusao);
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
                const numericValue = typeof value === 'string' ? parseFloat(value) : value;
                return `R$ ${numericValue.toFixed(2)}`;
            },
            positionText: 'text-right'
        },
        {
            key: 'status',
            header: 'Status',
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