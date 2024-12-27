import { PedidoSchema } from "./PedidoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function hookPedidoForm(dadosPedido ?: PedidoSchema){
    const form = useForm<PedidoSchema>({
        resolver: zodResolver(PedidoSchema),
        defaultValues: dadosPedido || {
            id: "",
            cliente: { id: "", nome: "", setor: { id: "", nome: "" }, foto: "", usuario: "", senha: "", permissao: "USER" },
            bebida: { id: "", nome: "", descricao: "", preco: 0, image: "", status: "Ativo" },
            unitario: 0,
            quantidade: 0,
            total: 0,
            dataCompra: new Date()
        }
    })

    const { handleSubmit, formState: {errors} } = form

    async function onSubmit(data : PedidoSchema){
        if(dadosPedido){
            await pedidoService.atualizarDadosId(dadosPedido.id, data)
        }
        else{
            await pedidoService.criarNovoCadastroId(data)
        }

    }

    return({
        form,
        handleSubmit,
        errors,
        onSubmit
    }
    )

}
