import GenericTable from "@/components/table/tableGenerica";
import { imageService } from "@/service/ImageService";
import { pessoaService } from "@/service/PessoaService";
import IPessoa from "@/utils/interfaces/IPessoa";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);

    async function fetchData(page: number = 1, filters: object = {}) {
        const { data, totalPages } = await pessoaService.listarDadosListagem(filters, page, 12);

        SetPessoas(data);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);


    async function handleDelete(id: string){
        await pessoaService.deletarDadosId(id);
        const dadosAposExclusao = pessoas.filter(pessoa => pessoa.id !== id);
        SetPessoas(dadosAposExclusao);
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
            render: (value: string) => (
            <Badge fontVariant={value === 'Ativado' ? 'default' : 'secondary'}>
          {value}
            </Badge>
            )

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