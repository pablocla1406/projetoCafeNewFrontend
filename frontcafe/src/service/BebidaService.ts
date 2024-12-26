import IBebida from "../utils/interfaces/IBebida";
import IBebidaListagem from "../utils/interfaces/Listagem/IBebidaListagem";
import ApiService from "./ApiService";

class BebidaService extends ApiService<IBebida | IBebidaListagem>{
    constructor(){
        super('/bebidas')
    }
}

export const bebidaService = new BebidaService