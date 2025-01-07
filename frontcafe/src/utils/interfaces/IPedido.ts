import { ISetor } from "./ISetor";

export default interface IPedido{
    id: string,
    cliente: {
        id: string;
        nome: string;
        setor: ISetor
        foto?: string;
        usuario: string;
        senha: string;
        permissao: "ADMIN" | "USER" | "AUX";
    };
    bebida: {
        id: string;
        nome: string;
        preco: number;
        descricao: string;
        image?: string | File;
        status: "Ativo" | "Inativado";
    };
    unitario: number,
    quantidade: number,
    total: number,
    data_compra: Date,
}