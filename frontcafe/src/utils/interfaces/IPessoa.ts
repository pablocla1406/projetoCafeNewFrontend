import { ISetor } from "./ISetor";

export default interface IPessoa {
    id: string,
    nome: string,
    setor: ISetor,
    imagem: `data:image/${string};base64,${string}` | null,
    usuario: string,
    senha: string,
    permissao: "ADMIN" | "USER" | "AUX"
}