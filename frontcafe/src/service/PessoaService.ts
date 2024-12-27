import IPessoa from "../utils/interfaces/IPessoa";
import ApiService from "./ApiService";

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('/Pessoas')
    }
}

export const pessoaService = new PessoaService()