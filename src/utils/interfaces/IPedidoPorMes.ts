import { IClientStats } from "@/page/Listagens/tabelaRelatorio";

export default interface IPedidoPorMes extends Omit <IClientStats, 'cliente' | 'vezesComprou' | 'valorTotal' | 'mesAno'>{
    anoMes: string
    totalVendas: number
}