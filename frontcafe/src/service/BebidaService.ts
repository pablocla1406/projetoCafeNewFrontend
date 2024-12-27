import IBebida from "../utils/interfaces/IBebida";
import IBebidaListagem from "../utils/interfaces/Listagem/IBebidaListagem";
import api from "./api";
import ApiService from "./ApiService";

class BebidaService extends ApiService<IBebida>{
    constructor(){
        super('bebidas')
    }

    async  listarBebidasListagem(
        filters: object = {},
        page: number = 1,
        limit: number = 12
    ): Promise<{ data: IBebidaListagem[], totalPages: number }> {
        const resposta = await api.get<{ data: IBebidaListagem[], totalPages: number }>('/bebidas/listagem', {params: { ...filters, page, limit } });
        return resposta.data;
    }


}

export const bebidaService = new BebidaService()