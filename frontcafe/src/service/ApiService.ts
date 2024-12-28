import api from "./api";

class ApiService<T>{
    protected recurso: string

    constructor(recurso: string){
        this.recurso = recurso
    }

    async listarDados(){
        try {
            const resposta = await api.get<T[]>(`/${this.recurso}`)
            return resposta.data
            
        } catch (error) {
            console.error(error)            
            return []
        }
    }

    async listarDadosId(id: string): Promise<T>{
        const resposta = await api.get<T>(`/${this.recurso}/${id}`)
        return resposta.data
    }




    async atualizarDadosId(id: string, dadosAtualizados: Partial<T>): Promise<void>{
        await api.put<T>(`/${this.recurso}/${id}`, dadosAtualizados)
    }

    async criarNovoCadastroId(dadosCadastro: Partial<T>): Promise<T>{
        const resposta = await api.post<T>(`/${this.recurso}`, dadosCadastro)
        return resposta.data
    }

    async deletarDadosId(id: string): Promise<void>{
        await api.delete<T>(`/${this.recurso}/${id}`)
    }
}

export default ApiService