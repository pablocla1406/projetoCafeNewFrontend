import { IClientStats } from "@/page/Listagens/tabelaRelatorio";

export default interface IPedidos6meses extends Omit <IClientStats, 'cliente' | 'vezesComprou' | 'valorTotal'>{
    totalVendas: number
}