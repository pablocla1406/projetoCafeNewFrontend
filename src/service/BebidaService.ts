import IBebidasMaisVendidas from "@/utils/interfaces/IBebidasMaisVendidas";
import IBebida from "../utils/interfaces/IBebida";
import ApiService from "./ApiService";
import api from "./api";

class BebidaService extends ApiService<IBebida>{
    constructor(){
        super('bebidas')
    }


    async listarBebidasMaisVendidas(mes?: number, ano?: number): Promise<IBebidasMaisVendidas[]>{
        const params = mes != null && ano != null ? `?mes=${mes}&ano=${ano}` : '';
        const resposta = await api.get<IBebidasMaisVendidas[]>(`/${this.recurso}/maisVendidas${params}`)
        return resposta.data
    }



}



export const bebidaService = new BebidaService()