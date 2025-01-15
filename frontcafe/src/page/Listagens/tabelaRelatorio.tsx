import { downloadCSV } from "@/utils/DownloadCSV";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DiscordService from "@/service/DiscordService";
import { toast } from "sonner";

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
        const arquivoCafe = downloadCSV(clients, headers, 'relatorioCafe')
        return arquivoCafe
    }

    async function EnviaDiscord(){
        try {
            const arquivo = download();
            await DiscordService.enviaRelatorioCafe(arquivo, 'Olá @everyone, Segue o Relatório mensal do Café');
            toast.success('Relatório enviado com sucesso para Discord');
        } catch (error) {
            console.error('Erro ao enviar relatório:', error);
            toast.error('Erro ao enviar relatório para Discord');
        }
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
                    <div className="flex-1">
                        <Button onClick={EnviaDiscord} className="text-start bg-[#5865f2] hover:bg-[#5865f2]/90 text-white flex items-center gap-2">
                            <img src="/src/lib/images/discord-logo-4-1.png" className="h-5 w-5" alt="Discord" />
                            Enviar Discord
                        </Button>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Fechar
                        </Button>
                        <Button onClick={download}>
                            Baixar Planilha
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}