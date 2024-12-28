import IPedido from "@/utils/interfaces/IPedido";
import ApiService from "./ApiService";

class PedidoService extends ApiService<IPedido> {
    constructor() {
        super("pedidos")
    }
}

export const pedidoService = new PedidoService();