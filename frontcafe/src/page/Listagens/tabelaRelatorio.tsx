import { downloadCSV } from "@/utils/DownloadCSV";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";

export interface IClientStats{
    mesAno: string;
    cliente: string;
    vezesComprou: number;
    valorTotal: number;
}

interface TabelaRelatorioProps{
    clients: IClientStats[];
}

const columnsClientStats = [
    {key: 'mesAno', header: 'Mês/Ano'},
    {key: 'cliente', header: 'Cliente'},
    {key: 'vezesComprou', header: 'Vezes Comprou'},
    {key: 'valorTotal', header: 'Valor Total'}
]

export default function TabelaRelatorio({clients}: TabelaRelatorioProps){
    function download(){
        const headers = columnsClientStats.map((column) => column.key)
        downloadCSV(clients, headers, 'relatorioCafe')

    }

    return(
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                        Relatório mensal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Gerar relatório mensal do Café
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
                        {clients.map((client) => (
                            <TableRow key={client.cliente}>
                                <TableCell>{client.mesAno}</TableCell>
                                <TableCell>{client.cliente}</TableCell>
                                <TableCell>{client.vezesComprou}</TableCell>
                                <TableCell>{client.valorTotal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <DialogFooter>
                    <Button variant="outline" onClick={download}>Baixar Relatório</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}