import { ISetor } from "../ISetor";

export default interface IPessoaListagem {
    id: string,
    imagem : string | null,
    nome: string,
    setor: ISetor,
}