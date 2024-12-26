import api from "./api"

class ApiService<T>{
    protected recurso: string

    constructor(recurso: string){
        this.recurso = recurso
    }

    async listarDados() : Promise<T[]>{
        const resposta = await api.get<T[]>(`/${this.recurso}`)
        return resposta.data
    }

    async listarDadosID(id : string) : Promise<T>{
        const resposta = await api.get<T>(`/${this.recurso}/${id}`)
        return resposta.data
    }

    async atualizarDadosID(id: string, dadosAtualizados : Partial<T>) : Promise<void>{
        await api.put<T>(`/${this.recurso}/${id}`, dadosAtualizados)
    }

    async criarNovoCadastroID(dadosCadastro: Partial<T>) : Promise<T>{
        const resposta = await api.post<T>(`/${this.recurso}`, dadosCadastro)
        return resposta.data
    }

    async DeletarDadosID(id: string): Promise<void>{
        await api.delete<T>(`/${this.recurso}/${id}`)
    }
}

export default ApiService