import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { pessoaFormSchema, PessoaFormSchema } from "./PessoaSchema";
import { useEffect } from "react";

export default function HookPessoaForm(dadosExistentes ?: PessoaFormSchema){
    console.log("HookPessoaForm recebeu dados:", dadosExistentes);

    const form = useForm<PessoaFormSchema>({
        resolver: zodResolver(pessoaFormSchema),
        defaultValues: {
            nome: "",
            foto: "",
            usuario: "",
            senha: "",
            setor: {id: "", nome: ""},
            permissao: "USER"
        }
    });

    const { handleSubmit, formState: {errors}, reset } = form;

    useEffect(() => {
        console.log("Form reset with data:", dadosExistentes);
        if (dadosExistentes) {
            reset(dadosExistentes);
        }
    }, [dadosExistentes, reset]);

    async function onSubmit(data : PessoaFormSchema){
        console.log("Form submitted with data:", data);
        if(dadosExistentes){
            await pessoaService.atualizarDadosId(dadosExistentes.id, data);
        } else {
            await pessoaService.criarNovoCadastroId(data);
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    };
}