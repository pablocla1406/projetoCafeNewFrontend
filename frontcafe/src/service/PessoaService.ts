import IPessoasMaisVendidas from "@/utils/interfaces/IPessoasAmamCafe";
import IPessoa from "../utils/interfaces/IPessoa";
import api from "./api";
import ApiService from "./ApiService";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }

    async listarPessoasQueMaisTomamCafe(mes?: number, ano?: number): Promise<IPessoasMaisVendidas[]>{
        const params = mes != null && ano != null ? `?mes=${mes}&ano=${ano}` : '';
        const resposta = await api.get<IPessoasMaisVendidas[]>(`/${this.recurso}/tomamMaisCafe${params}`)
        return resposta.data
    }
}


export const pessoaService = new PessoaService()