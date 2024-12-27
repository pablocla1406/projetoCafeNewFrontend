import { ISetor } from "@/utils/interfaces/ISetor";
import ApiService from "./ApiService";

class SetorService extends ApiService<ISetor> {
    constructor() {
        super('Setor')
    }
}

export const setorService = new SetorService();