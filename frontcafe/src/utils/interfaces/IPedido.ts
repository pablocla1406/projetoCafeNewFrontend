import IBebida from "./IBebida";

export default interface IPedido{
    id: string,
    cliente: string,
    bebida: string,
    unitario: number,
    quantidade: number,
    total: number,
    data_compra: Date,
}