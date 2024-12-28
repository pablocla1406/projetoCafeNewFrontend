import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { pessoaFormSchema, PessoaFormSchema } from "./Pessoaschema";

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
            await pessoaService.atualizarDadosId(dadosExistentes.id, data)
        }
        else{
            await pessoaService.criarNovoCadastroId(data)
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