import { HistoricoMes } from "@/components/Tela Inicial/MeusPedidos/MeusPedidos";

interface ILoginResponse {
    pessoa: {
        id: number;
        nome: string;
        usuario: string;
        permissao: string;
        setor: string;
        imagem: string;
        pedidosTotal: string;
        totalGasto: string;
        historicoUltimosMeses: HistoricoMes[];
    };
    token: string;
    tipo: string;
}

export default ILoginResponse;