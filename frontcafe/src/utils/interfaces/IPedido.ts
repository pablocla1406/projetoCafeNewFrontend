import { ISetor } from "./ISetor";

export default interface IPedido{
    id: string,
    cliente: {
        id: string;
        nome: string;
    }
    bebida: {
        id: string;
        nome: string
    };
    unitario: number,
    quantidade: number,
    total: number,
    data_compra: Date,
}