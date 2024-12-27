export enum Status {
    Ativo = "Ativo",
    Inativado = "Inativado"
}

export default interface IBebidaListagem {
    id: string,
    nome: string,
    preco: number,
    image: string,
    status: Status,
}