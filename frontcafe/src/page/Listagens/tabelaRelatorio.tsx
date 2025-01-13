import { downloadCSV } from "@/utils/DownloadCSV";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export interface IClientStats{
    mesAno: string;
    cliente: string;
    vezesComprou: number;
    valorTotal: number;
}

interface TabelaRelatorioProps{
    clients: IClientStats[];
    onClose: () => void;
    open: boolean;
}

const columnsClientStats = [
    {key: 'mesAno', header: 'Mês/Ano'},
    {key: 'cliente', header: 'Cliente'},
    {key: 'vezesComprou', header: 'Vezes Comprou'},
    {key: 'valorTotal', header: 'Valor Total'}
]

export default function TabelaRelatorio({clients, onClose, open}: TabelaRelatorioProps){
    console.log('TabelaRelatorio rendered with clients:', clients, 'open:', open);
    
    function download(){
        console.log('Downloading CSV for clients:', clients);
        const headers = columnsClientStats.map((column) => column.key)
        downloadCSV(clients, headers, 'relatorioCafe')
    }

    return(
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                        Relatório mensal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Gerar relatório mensal do Café
                    </p>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columnsClientStats.map((column) => (
                                <TableHead key={column.key}>{column.header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client, index) => (
                            <TableRow key={index}>
                                <TableCell>{client.mesAno}</TableCell>
                                <TableCell>{client.cliente}</TableCell>
                                <TableCell>{client.vezesComprou}</TableCell>
                                <TableCell>R$ {client.valorTotal.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={onClose}>
                        Fechar
                    </Button>
                    <Button onClick={download}>
                        Baixar CSV
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}