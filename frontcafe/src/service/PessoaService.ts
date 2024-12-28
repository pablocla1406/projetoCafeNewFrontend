import IPessoaListagem from "@/utils/interfaces/Listagem/IPessoaListagem";
import IPessoa from "../utils/interfaces/IPessoa";
import ApiService from "./ApiService";
import api from "./api";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }



     
     async listarDadosFiltrados(
        filters: object = {},
        page: number = 1,
        limit: number = 12
    ): Promise<{ data: IPessoaListagem[], totalPages: number }> {
        const resposta = await api.get<{
            items: IPessoaListagem[],
            totalItems: number,
            currentPage: number,
            totalPages: number,
            itemsPerPage: number
        }>('/pessoas/listagem', {params: { ...filters, page, limit } });
        
        return {
            data: resposta.data.items,
            totalPages: resposta.data.totalPages
        }
    }

    
}

export const pessoaService = new PessoaService()