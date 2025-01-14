import api from "./api";

class DiscordService {

    async enviaRelatorioCafe(file: File, content: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);

    const resposta = await api.post('/enviarDiscord', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return resposta;
}

}

export default new DiscordService();