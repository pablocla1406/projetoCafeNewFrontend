import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PedidoSchema } from "./PedidoSchema";
import { pedidoService } from "@/service/PedidoService";

export default function HookPedidoForm(dadosExistentes?: PedidoSchema) {
    console.log("HookPedidoForm recebeu dados:", dadosExistentes);

    const form = useForm<PedidoSchema>({
        resolver: zodResolver(PedidoSchema),
        mode: "onChange",
        defaultValues: {
            id: dadosExistentes?.id || "",
            cliente: dadosExistentes?.cliente || "",
            bebida: dadosExistentes?.bebida || "",
            unitario: dadosExistentes?.unitario || 0,
            quantidade: dadosExistentes?.quantidade || 0,
            total: dadosExistentes?.total || 0,
            data_compra: dadosExistentes?.data_compra || new Date(),
        }
    });

    const { handleSubmit, formState: { errors }, reset } = form;

    async function onSubmit(data: PedidoSchema) {
        try {
            console.log('Dados a serem enviados:', data);
            if (data.id) {
                await pedidoService.atualizarDadosId(Number(data.id), data);
            } else {
                await pedidoService.criarNovoCadastroId(data);
            }
            console.log("Operação realizada com sucesso!");
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    };
}
