import IBebida from "./IBebida";

export default interface IBebidasMaisVendidas extends Omit<IBebida, "preco" | "status" | "descricao"> {
    quantidade: number
}