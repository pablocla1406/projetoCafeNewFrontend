import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import IPessoa from "@/utils/interfaces/IPessoa";
import React, { useEffect, useState } from "react";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<object>({});

    async function fetchData(page: number = 1, currentFilters: object = {}) {
        try {
            console.log('Fetching with filters:', currentFilters);
            const { data, totalPages } = await pessoaService.listarDadosListagem(currentFilters, page, 12);
            console.log('Received data:', data);
            if (data) {
                SetPessoas(data);
                SetTotalPages(totalPages);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        console.log('useEffect triggered with filters:', filters);
        fetchData(currentPage, filters);
    }, [currentPage, filters]); 

    async function handleDelete(id: string){
        try {
            await pessoaService.deletarDadosId(id);
            const dadosAposExclusao = pessoas.filter(pessoa => pessoa.id !== id);
            SetPessoas(dadosAposExclusao);
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    }

    const handleFilter = React.useCallback(
        (newFilters: object) => {
            console.log('handleFilter called with:', newFilters);
            SetCurrentPage(1);
            SetFilters(newFilters);
        },
        []
    );

    const debouncedFilter = React.useCallback(
        (newFilters: object) => {
            const handler = setTimeout(() => {
                handleFilter(newFilters);
            }, 700);
            return () => clearTimeout(handler);
        },
        [handleFilter]
    );

    const columnPessoa  = [
        {
            key: 'id',
            header: 'ID',
            filterable: true,
        },
        {
            key: 'nome',
            header: 'Nome',
            filterable: true,
        },
        {
            key: 'setor',
            header: 'Setor',
            filterable: true,
        }
    ]

    
    return(
        <GenericTable
        data={pessoas}
        columns={columnPessoa}
        href="cadastroPessoa"
        onDelete={handleDelete}
        onFilter={debouncedFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        />
    )

}