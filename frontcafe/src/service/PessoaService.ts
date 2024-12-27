import IPessoaListagem from "@/utils/interfaces/Listagem/IPessoaListagem";
import IPessoa from "../utils/interfaces/IPessoa";
import ApiService from "./ApiService";
import api from "./api";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }



     /**
     * Obtém dados filtrados (colunas reduzidas) para listagem
     * @param filters Filtros opcionais
     * @param page Página atual
     * @param limit Limite de itens por página
     * @returns Dados no formato de IPessoaListagem
     */
     async listarDadosFiltrados(
        filters: object = {},
        page: number = 1,
        limit: number = 12
    ): Promise<{ data: IPessoaListagem[], totalPages: number }> {
        // Faz a chamada à rota '/pessoas/listagem'
        const resposta = await api.get<{ data: IPessoaListagem[], totalPages: number }>('/pessoas/listagem', {params: { ...filters, page, limit } });
        return resposta.data;
    }

    
}

export const pessoaService = new PessoaService()