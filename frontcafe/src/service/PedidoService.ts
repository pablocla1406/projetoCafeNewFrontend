import IPedido from "@/utils/interfaces/IPedido";
import ApiService from "./ApiService";
import api from "./api";
import { IClientStats } from "@/page/Listagens/tabelaRelatorio";
import IPedidos6meses from "@/utils/interfaces/IPedidos6meses";

class PedidoService extends ApiService<IPedido> {
    constructor() {
        super("pedidos")
    }

    async pedidoRelatorio(mes?: number, ano?: number)  : Promise<IClientStats[]>{
        const params = mes && ano ? `?mes=${mes}&ano=${ano}` : '';
        console.log('Service - Params:', { mes, ano, url: `/${this.recurso}/relatorio${params}` });
        const resposta = await api.get<IClientStats[]>(`/${this.recurso}/relatorio${params}`);
        console.log('Service - Response:', resposta.data);
        return resposta.data
    }


    async listarPedidosUltimos6meses() : Promise<IPedidos6meses[]>{
        const resposta = await api.get<IPedidos6meses[]>(`/${this.recurso}/relatorio/ultimos6meses`);
        return resposta.data
    }
}


export const pedidoService = new PedidoService();