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

    /**
     * @param {object} filters - Filtros para a busca.
     * @param {number} [page=1] - Número da página (default: 1).
     * @param {number} [limit=12] - Limite de itens por página (default: 12).
     * @returns {Promise<{ data: T[], totalPages: number }>} - Dados filtrados e total de páginas.
     */
    async listarDadosComFiltros(filters: object, page: number = 1, limit: number = 12): Promise<{ data: T[], totalPages: number }> {
        console.log('Requesting data with filters:', filters, 'page:', page, 'limit:', limit);
        const resposta = await api.get<{ data: T[], totalPages: number }>(`/${this.recurso}`, { params: { ...filters, page, limit } });
        console.log('Response data:', resposta.data);
        return resposta.data;
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