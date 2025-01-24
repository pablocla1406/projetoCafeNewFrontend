import PaginationParaTabela from "@/components/table/Pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { setorService } from "@/service/setorService";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { schemaSetor } from "../Formularios/FormPessoa/SetorSchema";

interface listagemSetoresProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}


export default function ListagemSetores({ open, setOpen }: listagemSetoresProps) {
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [setores, SetSetores] = useState<schemaSetor[]>([]);
    const [filters, SetFilters] = useState<Record<string, string>>({});
    const [novoSetorNome, setNovoSetorNome] = useState('');

    
    async function fetchDataSetores(page: number = 1, currentFilters: Record<string, string> = {}) {
        try {
            const { data, totalPages } = await setorService.listarDadosListagem(currentFilters, page);
            if (data) {
                SetSetores(data);
            SetTotalPages(totalPages);
            SetCurrentPage(page);
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        fetchDataSetores(currentPage, filters);
    }, [currentPage, filters]);

    
    async function handleCreate(novoSetor: schemaSetor){
        try{
            const setorExistente = setores.find(setor => 
                setor.nome.toLowerCase() === novoSetor.nome.toLowerCase()
            );
            
            if (setorExistente) {
                toast.error("Já existe um setor com este nome!");
                return;
            }

            await setorService.criarNovoCadastroId(novoSetor);
            const setoresAtualizados = [novoSetor, ...setores];
            SetSetores(setoresAtualizados);
            toast.success("Setor criado com sucesso!");   
        } catch (error) {
            toast.error("Erro ao criar novo setor");
        }
    }
    
    async function handleDelete(id: string){
        try {
            await setorService.deletarDadosId(id);
            const dadosAposExclusao = setores.filter(setor => setor.id !== id);
            SetSetores(dadosAposExclusao);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Erro ao excluir setor';
            toast.error(errorMessage);
            throw error;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoSetorNome.trim()) {
            toast.error("Nome do setor é obrigatório");
            return;
        }
        
        const novoSetor: schemaSetor = {
            nome: novoSetorNome
        };
        
        await handleCreate(novoSetor);
        setNovoSetorNome(''); 
        

    };

    
    return(
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Listagem de Setores</DialogTitle>
                    <DialogDescription>Confira a listagem de setores</DialogDescription>
                </DialogHeader>

                <div className=" space-x-5">
                    <div className="flex items-center flex-row space-x-5">
                        <form onSubmit={handleSubmit} className="flex items-center flex-row space-x-5">
                            <label htmlFor="setor" className="text-sm">Nome Setor:</label>
                            <input 
                                type="text" 
                                id="setor" 
                                value={novoSetorNome}
                                onChange={(e) => setNovoSetorNome(e.target.value)}
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button variant="outline" className="h-17 w-17" type="submit">Criar Setor</Button>
                        </form>
                    </div>

                <Table className="w-full">
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-center">Nome</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="text-center">
                        {setores.length > 0 ? setores.map((setor) => (
                            <TableRow key={setor.id}>
                                <TableCell className="text-center">{setor.nome}</TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center ">
                                        <Button size="icon" variant="outline" onClick={() => setor.id && handleDelete(setor.id)}> <Trash2 /> </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={2}>Nenhum setor encontrado</TableCell>
                            </TableRow>
                        )}


                    </TableBody>
                    
                </Table>
                <div className="mt-4">
                    <PaginationParaTabela 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={SetCurrentPage}
                    />
                </div>
                </div>
                
            </DialogContent>
        </Dialog>
    )





}

        