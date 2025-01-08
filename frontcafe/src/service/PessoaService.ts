import IPessoa from "../utils/interfaces/IPessoa";
import api from "./api";
import ApiService from "./ApiService";

interface IUploadResponse {
    message: string;
    previewUrl: string;
    tempFileName: string;
    currentImage?: string;
}

class PessoaService extends ApiService<IPessoa>{
    constructor(){
        super('pessoas')
    }

    async uploadImagemCadastro(imagem: File): Promise<IUploadResponse> {
        const formData = new FormData();
        formData.append('imagem', imagem);
        const resposta = await api.post(`/${this.recurso}/upload-cadastro`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return resposta.data as IUploadResponse;
    }

    async uploadImagem(id: string, imagem: File): Promise<IUploadResponse> {
        const formData = new FormData();
        formData.append('imagem', imagem);
        const resposta = await api.post(`/${this.recurso}/${id}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return resposta.data as IUploadResponse;
    }

    async deleteImagem(id: string) {
        await api.delete(`/${this.recurso}/${id}/imagem`);
    }

    async atualizarDadosId(id: string, dadosAtualizados: Partial<IPessoa>): Promise<void> {
        await api.put(`/${this.recurso}/${id}/updatePessoa`, dadosAtualizados);
    }

    async criarNovoCadastroId(dadosCadastro: Partial<IPessoa>): Promise<IPessoa> {
        const resposta = await api.post(`/${this.recurso}`, dadosCadastro);
        return resposta.data;
    }
}

export const pessoaService = new PessoaService()