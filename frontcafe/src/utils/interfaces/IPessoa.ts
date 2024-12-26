import { ISetor } from "./ISetor";

export default interface IPessoa {
    id: string,
    nome: string,
    Setor: ISetor,
    foto?: string | undefined,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}