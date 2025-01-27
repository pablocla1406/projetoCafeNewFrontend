export enum Status {
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export default interface IBebidaListagem {
    id: string,
    nome: string,
    preco: string | number,
    image: string,
    status: Status,
}