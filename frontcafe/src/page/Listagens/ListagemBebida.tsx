import GenericTable from "@/components/table/tableGenerica";
import { bebidaService } from "@/service/BebidaService";
import { debounce } from "@/utils/functions/debounce";
import IBebida from "@/utils/interfaces/IBebida";
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

    const handleFilter = React.useCallback(
        (newFilters: Record<string, string>) => {
            console.log('handleFilter called with:', newFilters);
            SetCurrentPage(1);
            SetFilters(newFilters);
        },
        []
    );

    const debouncedFilter = React.useCallback(
        debounce((newFilters: Record<string, string>) => {
            console.log('debounced filter executing with:', newFilters);
            handleFilter(newFilters);
        }, 300),
        [handleFilter]
    );

    const columnsBebidas = [
        {
            key: 'id',
            header: 'ID',
            filterable: true
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
            }
        },
        {
            key: 'status',
            header: 'Status',
            filterable: true
        }
    ]


    return(
        <GenericTable
        data={bebidas}
        columns={columnsBebidas}
        href="cadastroBebida"
        onDelete={handleDelete}
        onFilter={debouncedFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        />


    )

}