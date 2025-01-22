import IPedido from "@/utils/interfaces/IPedido";
import ApiService from "./ApiService";
import api from "./api";
import { IClientStats } from "@/page/Listagens/tabelaRelatorio";
import IPedidoPorMes from "@/utils/interfaces/IPedidoPorMes";

class PedidoService extends ApiService<IPedido> {
    constructor() {
        super("pedidos")
    }

    async pedidoRelatorio(mes?: number, ano?: number)  : Promise<IClientStats[]>{
        const params = mes && ano ? `?mes=${mes}&ano=${ano}` : '';
        const resposta = await api.get<IClientStats[]>(`/${this.recurso}/relatorio${params}`);
        return resposta.data
    }


    async listarPedidosporMes(mesInicial?: string, mesFinal?: string) : Promise<IPedidoPorMes[]>{
        const params = mesInicial && mesFinal ? `?mesInicial=${mesInicial}&mesFinal=${mesFinal}` : '';
        const resposta = await api.get<IPedidoPorMes[]>(`/${this.recurso}/listarPedidosPorMes${params}`);
        return resposta.data
    }
}


export const pedidoService = new PedidoService();