import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import debounce from "@/utils/functions/debounce";
import IPessoa from "@/utils/interfaces/IPessoa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<Record<string, string>>({});

    async function fetchData(page: number = 1, currentFilters: Record<string, string> = {}) {
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
            fetchData(currentPage, filters);
        } catch (error) {
            console.error('Erro ao deletar:', error);
        }
    }


    async function handleDeleteUndo(PessoaExcluidaId: string) {
        try {
            await pessoaService.restaurarRegistro(PessoaExcluidaId);
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


    const columnPessoa  = [ 
        {
            key: 'id',
            header: 'ID',
            filterable: true,
        },
        {
            key: 'imagem',
            header: 'Foto',
            render: (value: any) => 
                <div className="flex justify-center items-center">
                <Avatar >
                    <AvatarImage src={value} className="h-12 w-12 rounded-full" />
                    <AvatarFallback>
                        <CircleUserRound className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                </div>

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
        cadHref="cadastroPessoa"
        data={pessoas}
        columns={columnPessoa}
        href="cadastroPessoa"
        onDelete={handleDelete}
        onDeleteUndo={handleDeleteUndo}
        onFilter={handleFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={SetCurrentPage}
        />
    )

}