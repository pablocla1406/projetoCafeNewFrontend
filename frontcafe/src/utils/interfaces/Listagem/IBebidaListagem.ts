export enum Status {
    Ativo = "Ativo",
    Inativado = "Inativado"
}

export default interface IBebidaListagem {
    id: string,
    nome: string,
    preco: string | number,
    image: string,
    status: Status,
}