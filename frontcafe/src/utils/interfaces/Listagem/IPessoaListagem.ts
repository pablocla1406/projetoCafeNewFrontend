import { ISetor } from "../ISetor";

export default interface IPessoaListagem {
    id: string,
    foto : string | null,
    nome: string,
    setor: ISetor,
}