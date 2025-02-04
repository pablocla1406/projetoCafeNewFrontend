import { useEffect, useState } from "react";

interface BebidaMaisComprada {
    nome: string;
    quantidade: number;
}

export interface HistoricoMes {
    mesAno: string;
    totalGastoMes: number;
    totalPedidosMes: number;
    bebidasMaisCompradasMes: BebidaMaisComprada[];
}

interface DadosUsuarioPropsPedidos {
    totalGasto: number;
    pedidosTotal: number;
    historicoUltimosMeses: HistoricoMes[];
}

export default function MeusPedidos() {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioPropsPedidos>({
        totalGasto: 0,
        pedidosTotal: 0,
        historicoUltimosMeses: []
    });

    useEffect(() => {
        const carregarDados = () => {
            const dadosHistorico = localStorage.getItem('historicoUltimosMeses');
            const totalGasto = localStorage.getItem('totalGasto');
            const pedidosTotal = localStorage.getItem('pedidosTotal');

            setDadosUsuario({
                totalGasto: totalGasto ? Number(totalGasto) : 0,
                pedidosTotal: pedidosTotal ? Number(pedidosTotal) : 0,
                historicoUltimosMeses: dadosHistorico ? JSON.parse(dadosHistorico) : []
            });
        };

        carregarDados();
    }, []);

    const formatarMesAno = (mesAno: string) => {
        const [ano, mes] = mesAno.split('-');
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return `${meses[Number(mes) - 1]} ${ano}`;
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold mb-4">Meus Pedidos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Gasto</h2>
                        <p className="text-3xl font-bold text-green-600">
                            R$ {dadosUsuario.totalGasto.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Pedidos</h2>
                        <p className="text-3xl font-bold text-blue-600">
                            {dadosUsuario.pedidosTotal}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Histórico Últimos 3 Meses</h2>
                    {dadosUsuario.historicoUltimosMeses ? dadosUsuario.historicoUltimosMeses.map((historico, index) => (
                <div className="grid grid-cols-1 gap-6">
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {formatarMesAno(historico.mesAno)}
                                    </h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-gray-600">
                                            Total: <span className="font-semibold text-green-600">
                                                R$ {historico.totalGastoMes.toFixed(2)}
                                            </span>
                                        </p>
                                        <p className="text-gray-600">
                                            Pedidos: <span className="font-semibold text-blue-600">
                                                {historico.totalPedidosMes}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 min-w-[250px]">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Bebidas Mais Pedidas:
                                    </h4>
                                    <ul className="space-y-2">
                                        {historico.bebidasMaisCompradasMes.map((bebida, idx) => (
                                            <li key={idx} className="flex justify-between items-center">
                                                <span className="text-gray-600">{bebida.nome}</span>
                                                <span className="font-semibold text-gray-800">
                                                    {bebida.quantidade}x
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center p-4">
                            <h2> Nenhum pedido recente</h2>
                            <p> Já faz um tempo que você não pede fichinhas! Que tal fazer um pedido agora? </p>
                        </div>
                    )}
            </div>
        </div>
    );
}