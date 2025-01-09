import IPessoa from "../utils/interfaces/IPessoa";
import api from "./api";
import ApiService from "./ApiService";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }

    

   

    async atualizarDadosId(id: string, dadosAtualizados: Partial<IPessoa>): Promise<void> {
        await api.put(`/${this.recurso}/${id}/updatePessoa`, dadosAtualizados);
    }

   
}

export const pessoaService = new PessoaService()