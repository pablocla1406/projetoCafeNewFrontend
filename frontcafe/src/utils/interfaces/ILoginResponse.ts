interface ILoginResponse {
    pessoa: {
        id: number;
        nome: string;
        usuario: string;
        permissao: string;
        setor: string;
        foto: string;
    };
    token: string;
    tipo: string;
}

export default ILoginResponse;