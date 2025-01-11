import { bebidaService } from "@/service/BebidaService";
import { BebidaSchema } from "./BebidaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { compressImage } from "@/utils/functions/image/comprimirImage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function hookBebidaForm(dadosBebidas ?: BebidaSchema){
    console.log("hookBebidaForm received data:", dadosBebidas);
    const navigate = useNavigate();
    
    const form = useForm<BebidaSchema>({
        resolver: zodResolver(BebidaSchema),
        defaultValues: {
            id: "",
            nome: "",
            descricao: "",
            preco: 0,
            imagem: null,
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

        let imagemFinal: `data:image/${string};base64,${string}` | null = null;

        if(data.imagem instanceof File) {
            try {
                const imagemComprimida = await compressImage(data.imagem);
                imagemFinal = imagemComprimida as `data:image/${string};base64,${string}`;
            } catch (error) {
                console.error("Erro ao comprimir imagem:", error);
            }
        } else {
            imagemFinal = data.imagem as `data:image/${string};base64,${string}` | null;
        }

        const dadosForRequisition = {
            nome: data.nome,
            descricao: data.descricao,
            preco: data.preco,
            imagem: imagemFinal,
            status: data.status
        };

        console.log("Form submitted with data:", dadosForRequisition);

        try {

        if(data.id) {
            const dadosPut = {
                ...dadosForRequisition,
                id: data.id  
            }
            await bebidaService.atualizarDadosId(data.id, dadosPut);
            toast.success("Bebida atualizada com sucesso!");
            navigate("/ListagemBebidas");
        } else {
            await bebidaService.criarNovoCadastroId(dadosForRequisition);
            toast.success("Bebida criada com sucesso!");
            navigate("/ListagemBebidas");
        }

        } catch (error) {
            console.error("Erro ao criar ou atualizar bebida:", error);
            toast.error("Erro ao criar ou atualizar bebida!");
        }

    
    
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    }
}