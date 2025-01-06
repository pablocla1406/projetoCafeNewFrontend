import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedidoService } from "@/service/PedidoService";
import { pessoaService } from "@/service/PessoaService";
import { bebidaService } from "@/service/BebidaService";
import { PedidoSchema } from "@/components/Formularios/FormPedido/PedidoSchema";
import PedidoForm from "@/components/Formularios/FormPedido/PedidoForm";
import IPessoa from "@/utils/interfaces/IPessoa";
import IBebida from "@/utils/interfaces/IBebida";

export default function PedidoCadastro() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<PedidoSchema | undefined>();
    const [clientes, setClientes] = useState<IPessoa[]>([]);
    const [bebidas, setBebidas] = useState<IBebida[]>([]);

    useEffect(() => {
        Promise.all([
            pessoaService.listarDados(),
            bebidaService.listarDados()
        ]).then(([clientesData, bebidasData]) => {
            setClientes(clientesData);
            setBebidas(bebidasData);
        }).catch(error => {
            console.error("Erro ao carregar dados:", error);
        });
    }, []);

    useEffect(() => {
        if(id) {
            receberDadosPedido();
        }
    }, [id]);

    async function receberDadosPedido() {
        if(id) {
            try {
                const dadosPedido = await pedidoService.listarDadosId(id);
                console.log("=== DEBUG: Dados do Pedido ===", dadosPedido);
                
                if(dadosPedido && typeof dadosPedido === 'object') {
                    const formattedData = {
                        id: dadosPedido.id.toString(),
                        cliente: dadosPedido.cliente,
                        bebida: dadosPedido.bebida,
                        unitario: Number(dadosPedido.unitario),
                        quantidade: Number(dadosPedido.quantidade),
                        total: Number(dadosPedido.total),
                        data_compra: new Date(dadosPedido.data_compra)
                    };
                    console.log("=== DEBUG: Dados Formatados ===", formattedData);
                    setPedido(formattedData);
                } else {
                    console.error("Dados recebidos inválidos:", dadosPedido);
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100 dark:bg-zinc-900">
            <PedidoForm
                dadosExistentes={pedido}
                clientes={clientes}
                bebidas={bebidas}
            />
        </div>
    );
}