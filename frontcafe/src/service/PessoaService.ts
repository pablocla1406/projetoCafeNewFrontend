import IPessoa from "../utils/interfaces/IPessoa";
import ApiService from "./ApiService";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }
}

export const pessoaService = new PessoaService()