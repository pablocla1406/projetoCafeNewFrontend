import { IFuncao } from "../IFuncao";

export default interface IPessoaListagem {
    id: string,
    nome: string,
    funcaoPrincipal: IFuncao,
    image: string
}