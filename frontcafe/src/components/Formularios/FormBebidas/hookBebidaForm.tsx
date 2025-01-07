import { bebidaService } from "@/service/BebidaService";
import { imageService } from "@/service/ImageService";
import { BebidaSchema } from "./BebidaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import IBebida from "@/utils/interfaces/IBebida";

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

    async function onSubmit(data: BebidaSchema) {
        console.log("Form submitted with data:", data);
        try {
            if (data.id) {
                await bebidaService.atualizarDadosId(Number(data.id), data);
            } else {
                await bebidaService.criarNovoCadastroId(data);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    }
}