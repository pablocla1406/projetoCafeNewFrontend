import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PedidoSchema } from "./PedidoSchema";
import { pedidoService } from "@/service/PedidoService";
import { useEffect } from "react";

export default function HookPedidoForm(dadosExistentes?: PedidoSchema) {
    console.log("HookPedidoForm recebeu dados:", dadosExistentes);

    const form = useForm<PedidoSchema>({
        resolver: zodResolver(PedidoSchema),
        mode: "onChange",
        defaultValues: {
            id: dadosExistentes?.id || "",
            cliente: dadosExistentes?.cliente || {
                id: "",
                nome: "",
                setor: { id: "", nome: "" },
                foto: "",
                usuario: "",
                senha: "",
                permissao: "USER"
            },
            bebida: dadosExistentes?.bebida || {
                id: "",
                nome: "",
                preco: 0,
                descricao: "",
                image: "",
                status: "Ativo"
            },
            unitario: dadosExistentes?.unitario || 0,
            quantidade: dadosExistentes?.quantidade || 0,
            total: dadosExistentes?.total || 0,
            data_compra: dadosExistentes?.data_compra || new Date(),
        }
    });

    const { handleSubmit, formState: { errors }, reset } = form;

    useEffect(() => {
        if (dadosExistentes) {
            const formattedData = {
                ...dadosExistentes,
                cliente: typeof dadosExistentes.cliente === 'string' 
                    ? {
                        id: "",
                        nome: dadosExistentes.cliente,
                        setor: { id: "", nome: "" },
                        foto: "",
                        usuario: "",
                        senha: "",
                        permissao: "USER" as const
                    }
                    : dadosExistentes.cliente,
                bebida: typeof dadosExistentes.bebida === 'string'
                    ? {
                        id: "",
                        nome: dadosExistentes.bebida,
                        preco: 0,
                        descricao: "",
                        image: "",
                        status: "Ativo" as const
                    }
                    : dadosExistentes.bebida,
                data_compra: new Date(dadosExistentes.data_compra)
            };
            reset(formattedData);
        }
    }, [dadosExistentes, reset]);

    async function onSubmit(data: PedidoSchema) {
        try {
            const formattedData = {
                ...data,
                cliente: typeof data.cliente === 'string' 
                    ? {
                        id: "",
                        nome: data.cliente,
                        setor: { id: "", nome: "" },
                        foto: "",
                        usuario: "",
                        senha: "",
                        permissao: "USER" as const
                    }
                    : data.cliente,
                bebida: typeof data.bebida === 'string'
                    ? {
                        id: "",
                        nome: data.bebida,
                        preco: 0,
                        descricao: "",
                        image: "",
                        status: "Ativo" as const
                    }
                    : data.bebida
            };

            if (data.id) {
                await pedidoService.atualizarDadosId(Number(data.id), formattedData);
            } else {
                await pedidoService.criarNovoCadastroId(formattedData);
            }
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
