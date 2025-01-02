import { ISetor } from "./ISetor";

export default interface IPessoa {
    id: string,
    nome: string,
    setor: ISetor,
    foto?: string ,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}