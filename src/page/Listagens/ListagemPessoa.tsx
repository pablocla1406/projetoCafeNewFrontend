import GenericTable from "@/components/table/tableGenerica";
import { pessoaService } from "@/service/PessoaService";
import debounce from "@/utils/functions/debounce";
import IPessoa from "@/utils/interfaces/IPessoa";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck, BadgeX, CircleUserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import ListagemSetores from "../../components/table/ListagemSetores";
import { toast } from "sonner";

export default function ListagemPessoa(){
    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [filters, SetFilters] = useState<Record<string, string>>({});
    const [open, setOpen] = useState(false);
    const [isAnimating, SetIsAnimating] = useState<string | null>(null);

    async function fetchData(page: number = 1, currentFilters: Record<string, string> = {}) {
        try {
            const { data, totalPages } = await pessoaService.listarDadosListagem(currentFilters, page, 12);
            if (data) {
                console.log('Dados recebidos:', data);
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
            const errorMessage = error.response?.data?.error || error.message || 'Erro ao excluir pessoa';
            toast.error(errorMessage);
            throw error; 
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


    async function ativarInativarStatus(id: string) {
        try {
            SetIsAnimating(id);
            const response = await pessoaService.ativarOuInativarRegisto(id);
            console.log('Resposta da ativação/inativação:', response);
            await fetchData(currentPage, filters); 
        } catch (error) {
            toast.error('Erro ao ativar ou inativar status');
        } finally {
            setTimeout(() => SetIsAnimating(null), 1000);
        }
    }

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
        },
        {
            key: 'id',
            header: 'Ativo',
            render: (value: string) => {
                const pessoa = pessoas.find(pessoa => pessoa.id === value);
                const isAnimatingButton = isAnimating === value;

                return(
                <div className="flex justify-center items-center">
                    {pessoa?.status === 'Inativo' ? (
                        <div 
                        className={`p-2 cursor-pointer transition-all duration-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/50 ${isAnimatingButton ? 'animate-spin-once bg-red-100 dark:bg-red-950' : ''}`}
                        onClick={() => !isAnimatingButton && ativarInativarStatus(value)}>
                            <BadgeX className={`text-red-500 ${isAnimatingButton ? 'scale-110' : ''}`} />
                        </div>
                    ) : (
                        <div
                        className={`p-2 cursor-pointer transition-all duration-500 rounded-full hover:bg-green-50 dark:hover:bg-green-950/50 ${isAnimatingButton ? 'animate-spin-once bg-green-100 dark:bg-green-950' : ''}`}
                        onClick={() => !isAnimatingButton && ativarInativarStatus(value)}>
                            <BadgeCheck className={`text-green-500 ${isAnimatingButton ? 'scale-110' : ''}`} />
                        </div>
                    )}
                </div>
            )},
            filterable: false,
        }
    ]

    
    return(
        <>
                <ListagemSetores
                open={open}
                setOpen={setOpen}
                />

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
        botaoAdicional={true}
        nomeBotaoAdicional="Listagem Setores"
        abrirDialogBotaoAdicional={() => setOpen(true)}
        
        />
    </>
    )
}