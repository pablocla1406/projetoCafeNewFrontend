import { IFuncao } from "@/utils/interfaces/IFuncao";
import ApiService from "./ApiService";

class FuncaoService extends ApiService<IFuncao>{
    constructor(){
        super('funcoes')
    }
}

export const funcaoService = new FuncaoService