import IPessoa from "./IPessoa";

export default interface IPessoasAmamCafe extends Omit<IPessoa, "setor" | "usuario" | "senha" | "permissao"> {
    vezesComprou: number
}