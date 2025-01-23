import PaginationParaTabela from "@/components/table/Pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { setorService } from "@/service/setorService";
import debounce from "@/utils/functions/debounce";
import { ISetor } from "@/utils/interfaces/ISetor";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface listagemSetoresProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
}


export default function ListagemSetores({ open, setOpen }: listagemSetoresProps) {
    const [currentPage, SetCurrentPage] = useState(1);
    const [totalPages, SetTotalPages] = useState(1);
    const [setores, SetSetores] = useState<ISetor[]>([]);
    const [filters, SetFilters] = useState<Record<string, string>>({});

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

  

    async function handleDelete(id: string){
        await setorService.deletarDadosId(id);
        const dadosAposExclusao = setores.filter(setor => setor.id !== id);
        SetSetores(dadosAposExclusao);
    }

    


    return(
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Listagem de Setores</DialogTitle>
                    <DialogDescription>Confira a listagem de setores</DialogDescription>
                </DialogHeader>

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
                                        <Button size="icon" variant="outline" onClick={() => handleDelete(setor.id)}> <Trash2 /> </Button>
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
                
            </DialogContent>
        </Dialog>
    )





}
