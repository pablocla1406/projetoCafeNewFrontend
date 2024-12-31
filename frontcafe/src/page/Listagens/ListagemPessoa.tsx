import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);

    async function fetchData(page: number = 1, filters: object = {}) {
        try {
            const { data, totalPages } = await pessoaService.listarDadosListagem(filters, page, 12);
            if (data) {
                SetPessoas(data);
                SetTotalPages(totalPages);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); 

    async function handleDelete(id: string){
        try {
            await pessoaService.deletarDadosId(id);
            const dadosAposExclusao = pessoas.filter(pessoa => pessoa.id !== id);
            SetPessoas(dadosAposExclusao);
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    }

    async function handleFilter(filters: object) {
        SetCurrentPage(1);
        await fetchData(1, filters);
    }

    const columnPessoa  = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'nome',
            header: 'Nome',
        },
        {
            key: 'setor',
            header: 'Setor',
            render: (row: IPessoa) => {
                try {
                    return row.setor?.nome || 'Não encontrado';
                } catch (error) {
                    console.error('Erro ao renderizar setor:', error);
                    return 'Erro';
                }
            }
        }
    ]

    
    return(
        <GenericTable
        data={pessoas}
        columns={columnPessoa}
        href="cadastroPessoa"
        onDelete={handleDelete}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        />
    )

}