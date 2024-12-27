import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import IPessoa from "@/utils/interfaces/IPessoa";
import IPessoaListagem from "@/utils/interfaces/Listagem/IPessoaListagem";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { head } from "axios";
import { Badge } from "lucide-react";
import { useEffect, useState } from "react";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoaListagem[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);

    async function getPessoas(page: number = 1, filters: object = {}) {
        const { data, totalPages } = await pessoaService.listarDadosComFiltros(filters, page, 12);
        const formattedData = data.map(pessoa => ({
            id: pessoa.id,
            foto: pessoa.foto,
            nome: pessoa.nome,
            setor: pessoa.setor
        }));
        SetPessoas(formattedData);
        SetTotalPages(totalPages);
    }

    useEffect(() => {
        getPessoas(currentPage);
    }, [currentPage]);

    async function handleDelete(id: string){
        await pessoaService.DeletarDadosID(id);
        const dadosAposExclusao = pessoas.filter(pessoa => pessoa.id !== id);
        SetPessoas(dadosAposExclusao);
    }

    async function handleFilter(filters: object) {
        SetCurrentPage(1);
        await getPessoas(1, filters);
    }



    const columnPessoa  = [
        {
            key: 'id',
            header: 'ID',
        },
        {
            key: 'foto',
            header: 'Foto',
            render: (value: string) => (
                <Avatar>
                    <AvatarImage src={value} alt="Avatar" />
                    <AvatarFallback>xD</AvatarFallback>
                </Avatar>
                
            )
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
        href={"pessoas"}
        onDelete={handleDelete}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        />
    )

}