
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
    responsavel_id: string;
    unitario: number,
    quantidade: number,
    total: number,
    data_compra: Date,
}