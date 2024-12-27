import { bebidaService } from "@/service/BebidaService";
import { BebidaSchema } from "./BebidaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function hookBebidaForm(dadosBebidas ?: BebidaSchema){
    const form = useForm<BebidaSchema>({
        resolver: zodResolver(BebidaSchema),
        defaultValues: dadosBebidas || {
            id: "",
            nome: "",
            descricao: "",
            preco: 0,
            image: "",
            status: "Ativo"
        }
    })

    const { handleSubmit, formState: {errors} } = form

    async function onSubmit(data : BebidaSchema){
        if(dadosBebidas){
            await bebidaService.atualizarDadosId(dadosBebidas.id, data)
        }
        else{
            await bebidaService.criarNovoCadastroId(data)
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