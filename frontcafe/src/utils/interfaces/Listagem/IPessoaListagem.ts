import { ISetor } from "../ISetor";

export default interface IPessoaListagem {
    id: string,
    nome: string,
    SetorPrincipal: ISetor,
    image: string
}