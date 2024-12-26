import IBebida from "./IBebida";
import IPessoa from "./IPessoa";

export default interface IPedido{
    id: string,
    cliente: IPessoa,
    bebida: IBebida,
    unitario: number,
    quantidade: number,
    total: number,
    dataCompra: Date,


}