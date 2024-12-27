import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaFormSchema, PessoaFormSchema } from "./schema";
import { pessoaService } from "@/service/PessoaService";

export default function HookPessoaForm(dadosExistentes ?: PessoaFormSchema){
    const form = useForm<PessoaFormSchema>({
        resolver: zodResolver(pessoaFormSchema),
        defaultValues: dadosExistentes || {
            nome: "",
            foto: "",
            usuario: "",
            senha: "",
            setor: {id: "", nome: ""},
            permissao: "USER"
        }
    })

    const { handleSubmit, formState: {errors} } = form

    async function onSubmit(data : PessoaFormSchema){
        if(dadosExistentes){
            await pessoaService.atualizarDadosID(dadosExistentes.id, data)
        }
        else{
            await pessoaService.criarNovoCadastroID(data)
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