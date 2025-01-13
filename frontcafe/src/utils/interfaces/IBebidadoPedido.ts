import IBebida from "./IBebida";

export default interface IBebidadoPedido extends Omit<IBebida, "imagem" | "status" | "descricao"> {
}