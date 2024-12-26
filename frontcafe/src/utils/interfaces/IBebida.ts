import { EnumDeclaration } from "typescript";

export default interface IBebida{
    id: string,
    nome: string,
    descricao: string,
    preco: number,
    image: string,
    status: "Ativo" | "Inativado"
    //String (RL): A maneira mais comum de armazenar imagens em bancos de dados é através de uma URL,
    //  que aponta para o local onde a imagem está armazenada (por exemplo, em um serviço de armazenamento em nuvem como AWS S3). 
    // Essa abordagem é mais flexível e permite que você utilize diferentes formatos de imagem.


}