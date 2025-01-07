import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pedidoService } from "@/service/PedidoService";
import { pessoaService } from "@/service/PessoaService";
import { bebidaService } from "@/service/BebidaService";
import PedidoForm from "@/components/Formularios/FormPedido/PedidoForm";
import IPessoa from "@/utils/interfaces/IPessoa";
import IBebida from "@/utils/interfaces/IBebida";
import IPedido from "@/utils/interfaces/IPedido";

export default function PedidoCadastro() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<IPedido>({
        id: id || "",
        cliente: {
            id: "",
            nome: "",
            setor: {
                id: "",
                nome: ""
            },
            foto: "",
            usuario: "",
            senha: "",
            permissao: "USER"
        },
        bebida: {
            id: "",
            nome: "",
            preco: 0,
            descricao: "",
            image: "",
            status: "Ativo"
        },
        unitario: 0,
        quantidade: 0,
        total: 0,
        data_compra: new Date()
    });
    
    const [clientesFiltrados, setClientesFiltrados] = useState<IPessoa[]>([]);
    const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([]);

    async function fetchData() {
        try {
            const clientesData = await pessoaService.listarDados();
            const bebidasData = await bebidaService.listarDados();

            // Normalizar os clientes para incluir setor como objeto
            const clientesNormalizados = clientesData.map((cliente: IPessoa) => ({
                ...cliente,
                setor: {
                    id: String(cliente.setor.id),
                    nome: cliente.setor.nome
                } 
            }));

            setClientesFiltrados(clientesNormalizados);
            setBebidasFiltradas(bebidasData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    async function receberDadosPedido() {
        if (id) {
            try {
                const dadosPedido = await pedidoService.listarDadosId(id);
                console.log("=== DEBUG: Dados do Pedido ===", dadosPedido);
                
                if (dadosPedido && typeof dadosPedido === 'object') {
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

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        receberDadosPedido();
    }, [id]);

    return (
        <PedidoForm
            dadosExistentes={pedido}
            clientes={clientesFiltrados}
            bebidas={bebidasFiltradas}
        />
    );
}
