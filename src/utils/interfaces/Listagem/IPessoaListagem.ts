import { ISetor } from "../ISetor";
import { Status } from "./IBebidaListagem";

export default interface IPessoaListagem {
    id: string,
    imagem : string | null,
    nome: string,
    setor: ISetor,
    status: Status
}