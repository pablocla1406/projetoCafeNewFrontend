import IBebida from "./IBebida";

export default interface IPedido{
    id: string,
    cliente: {
        id: string;
        nome: string;
        setor: {
            id: string;
            nome: string;
        };
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