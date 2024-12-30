import IBebida from "../utils/interfaces/IBebida";
import ApiService from "./ApiService";

class BebidaService extends ApiService<IBebida>{
    constructor(){
        super('bebidas')
    }
}

export const bebidaService = new BebidaService()