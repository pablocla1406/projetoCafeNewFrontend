import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import debounce from "@/utils/functions/debounce";
import IPessoa from "@/utils/interfaces/IPessoa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import ListagemSetores from "./ListagemSetores";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false);

    async function fetchData(page: number = 1, currentFilters: Record<string, string> = {}) {
        try {
            const { data, totalPages } = await pessoaService.listarDadosListagem(currentFilters, page, 12);
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
            await fetchData(currentPage, filters);
            return true; // Indicate successful deletion
        } catch (error: any) {
            toast.error(error.message)
            console.error('Erro ao deletar:', error);
            throw error; // Re-throw error to be caught by the table component
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
        <div className="space-y-4">
            <div className="flex justify-between items-right">

                <Button
                variant="outline"
                className="btnBonito" 
                onClick={() => setOpen(true)}
                >
                Listagem Setores
                </Button>

                <ListagemSetores
                open={open}
                setOpen={setOpen}
                />

            </div>
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
        </div>
    )

}