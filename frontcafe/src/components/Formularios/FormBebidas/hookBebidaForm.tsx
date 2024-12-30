import { bebidaService } from "@/service/BebidaService";
import { BebidaSchema } from "./BebidaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function hookBebidaForm(dadosBebidas ?: BebidaSchema){
    console.log("hookBebidaForm received data:", dadosBebidas);
    
    const form = useForm<BebidaSchema>({
        resolver: zodResolver(BebidaSchema),
        defaultValues: {
            id: "",
            nome: "",
            descricao: "",
            preco: 0,
            image: "",
            status: "Ativo"
        }
    });

    const { handleSubmit, formState: {errors}, reset } = form;

    useEffect(() => {
        console.log("Form reset with data:", dadosBebidas);
        if (dadosBebidas) {
            reset(dadosBebidas);
        }
    }, [dadosBebidas, reset]);

    async function onSubmit(data : BebidaSchema){
        console.log("Form submitted with data:", data);
        const formattedData = {
            ...data,
            preco: Number(data.preco)
        };
        if(dadosBebidas){
            await bebidaService.atualizarDadosId(dadosBebidas.id, formattedData)
        }
        else{
            await bebidaService.criarNovoCadastroId(formattedData)
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    }
}