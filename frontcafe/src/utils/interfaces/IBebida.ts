
export default interface IBebida{
    id: string,
    nome: string,
    descricao: string,
    preco: number,
    image?: string | File,
    status: "Ativo" | "Inativado"
    


}