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


    
    async listarDadosListagem(
        filters: object = {},
        page: number = 1,
        limit: number = 12
    ): Promise<{ data: T[], totalPages: number }> {
        const resposta = await api.get<{
            items: T[],
            totalItems: number,
            currentPage: number,
            totalPages: number,
            itemsPerPage: number,
        }>(`/${this.recurso}/listagem`, {params: { ...filters, page, limit } });
        
        return {
            data: resposta.data.items,
            totalPages: resposta.data.totalPages
        };
    }


    async atualizarDadosId(id: string | number, dadosAtualizados: Partial<T>): Promise<T>{
        const resposta = await api.put<T>(`/${this.recurso}/${id}`, dadosAtualizados)
        return resposta.data
    }

    async criarNovoCadastroId(dadosCadastro: Partial<T>): Promise<T>{
        const resposta = await api.post<T>(`/${this.recurso}`, dadosCadastro)
        return resposta.data
    }

    async deletarDadosId(id: string): Promise<void>{
        await api.delete<T>(`/${this.recurso}/${id}`)
    }

    async restaurarRegistro(id: string): Promise<T> {
        const resposta = await api.patch<T>(`/${this.recurso}/${id}/restore`)
        return resposta.data
    }


    async ativarOuInativarRegisto(id: string): Promise<T> {
        const resposta = await api.patch<T>(`/${this.recurso}/${id}/ativarouinativar`)
        return resposta.data
    }

}

export default ApiService