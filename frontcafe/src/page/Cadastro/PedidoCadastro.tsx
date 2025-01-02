import PedidoForm from "@/components/Formularios/FormPedido/PedidoForm";
import { bebidaService } from "@/service/BebidaService";
import { pedidoService } from "@/service/PedidoService";
import { pessoaService } from "@/service/PessoaService";
import IBebida from "@/utils/interfaces/IBebida";
import IPedido from "@/utils/interfaces/IPedido";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PedidoCadastro() {
    const {id} = useParams()

    const [clientesFiltrados, setClientesFiltrados] = useState<IPessoa[]>([])
    const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([])
    
    const [pedido, setPedido] = useState<IPedido>({
        id: id || "",
        cliente: { id: "", nome: "", setor: { id: "", nome: "" }, foto: "", usuario: "", senha: "", permissao: "USER" },
        bebida: { id: "", nome: "", descricao: "", preco: 0, image: "", status: "Ativo" },
        unitario: 0,
        quantidade: 0,
        total: 0,
        dataCompra: new Date()
    })

    async function buscarClienteseBebidas(){
        const clientes = await pessoaService.listarDados()
        const bebidas = await bebidaService.listarDados()

        setBebidasFiltradas(bebidas)
        setClientesFiltrados(clientes)
    }
    

    useEffect(() => {
        buscarClienteseBebidas()
    }, [])


    
    async function receberDadosPedido(){
        if(id){
            try {
                const dadosPedido = await pedidoService.listarDadosId(id)

                const formattedData = {
                    id: dadosPedido.id.toString(),
                    cliente: dadosPedido.cliente,
                    bebida: dadosPedido.bebida,
                    unitario: Number(dadosPedido.unitario),
                    quantidade: Number(dadosPedido.quantidade),
                    total: Number(dadosPedido.total),
                    dataCompra: new Date(dadosPedido.dataCompra)
                };
                console.log("Formatted data:", formattedData);
                setPedido(formattedData);
            
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
            }
        }
    }

    useEffect(() => {
        receberDadosPedido()
    }, [id])

    return(
        <PedidoForm 
        dados={pedido} 
        clientesFiltrados={clientesFiltrados}
        bebidasFiltradas={bebidasFiltradas} />
    )



}