import { IFuncao } from "./IFuncao";

export default interface IPessoa {
    id: string,
    nome: string,
    funcao: IFuncao,
    foto?: string | undefined,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}