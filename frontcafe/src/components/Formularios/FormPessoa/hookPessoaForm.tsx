import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { pessoaFormSchema, PessoaFormSchema } from "./PessoaSchema";
import { useEffect } from "react";

export default function HookPessoaForm(dadosExistentes ?: PessoaFormSchema){
    console.log("HookPessoaForm recebeu dados:", dadosExistentes);

    const form = useForm<PessoaFormSchema>({
        resolver: zodResolver(pessoaFormSchema),
        mode: "onChange",
        defaultValues: {
            id: dadosExistentes?.id || "",
            nome: dadosExistentes?.nome || "",
            foto: dadosExistentes?.foto || "",
            usuario: dadosExistentes?.usuario || "",
            senha: dadosExistentes?.senha || "",
            setor: dadosExistentes?.setor || { id: "", nome: "" },
            permissao: dadosExistentes?.permissao || "USER"
        }
    });

    const { handleSubmit, formState: { errors }, reset, setValue } = form;

    useEffect(() => {
        console.log("Form reset with data:", dadosExistentes);
        if (dadosExistentes) {
            reset({
                ...dadosExistentes,
                permissao: dadosExistentes.permissao || "USER",
                setor: dadosExistentes.setor || { id: "", nome: "" }
            });
        }
    }, [dadosExistentes, reset]);

    async function onSubmit(data : PessoaFormSchema){
        try {
            console.log("Dados a serem enviados:", data);
            if (dadosExistentes) {
                await pessoaService.atualizarDadosId(dadosExistentes.id, data);
            } else {
                await pessoaService.criarNovoCadastroId(data);
            }
            console.log("Operação realizada com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar:", error);
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