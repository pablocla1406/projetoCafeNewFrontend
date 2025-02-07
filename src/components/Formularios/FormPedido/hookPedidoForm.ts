import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PedidoSchema } from "./PedidoSchema";
import { pedidoService } from "@/service/PedidoService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function HookPedidoForm(dadosExistentes?: PedidoSchema) {

    const [usuarioResponsavel, setUsuarioResponsavel] = useState({
        id: "",
    })

    const navigate = useNavigate();

    const parseDate = (dateStr: string | Date | undefined) => {
        if (!dateStr) return new Date();
        
        const date = new Date(dateStr);
        if (dadosExistentes?.id) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    };

    const form = useForm<PedidoSchema>({
        resolver: zodResolver(PedidoSchema),
        mode: "onChange",
        defaultValues: {
            id: dadosExistentes?.id || "",
            cliente: dadosExistentes?.cliente || {
                id: "",
                nome: "",
            },
            bebida: dadosExistentes?.bebida || {
                id: "",
                nome: "",
            },
            unitario: dadosExistentes?.unitario || 0,
            quantidade: dadosExistentes?.quantidade || 1,
            total: dadosExistentes?.total || 0,
            data_compra: parseDate(dadosExistentes?.data_compra),
            responsavel_id: dadosExistentes?.responsavel_id || "",
        }
    });

    const { handleSubmit, formState: { errors }, reset } = form;

    useEffect(() => {
        const idUsuario = localStorage.getItem('id');
        
        if (idUsuario) {
            setUsuarioResponsavel({ id: idUsuario });
        }

        if (dadosExistentes) {
            const formattedData = {
                ...dadosExistentes,
                data_compra: parseDate(dadosExistentes.data_compra),
                responsavel_id: usuarioResponsavel.id || ""
            };
            reset(formattedData);
        }
    }, [dadosExistentes, reset]);

    async function onSubmit(data: PedidoSchema) {
        try {

            const dadosBasePedido = {
                cliente: {
                    id: data.cliente.id,
                    nome: data.cliente.nome
                },
                bebida: {
                    id: data.bebida.id,
                    nome: data.bebida.nome
                },
                unitario: (data.unitario),
                quantidade: data.quantidade,
                total: data.total,
                data_compra: data.data_compra,
            };

            if (data.id) {
                const dadosPut = {
                    ...dadosBasePedido,
                    id: data.id
                };
                await pedidoService.atualizarDadosId(data.id, dadosPut);
                toast.success('Pedido atualizado com sucesso!');
                navigate('/ListagemPedidos');
            } else {
                const dadosPost = {
                    ...dadosBasePedido,
                    responsavel_id: usuarioResponsavel.id
                };
                await pedidoService.criarNovoCadastroId(dadosPost);
                toast.success('Pedido criado com sucesso!');
                navigate('/ListagemPedidos');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            toast.error('Erro ao enviar dados!');
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    };
}
