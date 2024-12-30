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
            // Create a copy of the data without the image field
            const { image, ...bebidaData } = data;
            
            // Format the data for the service
            const formattedData: Partial<IBebida> = {
                ...bebidaData,
                preco: Number(data.preco),
                // Only include image if it's a string (URL)
                ...(typeof image === 'string' ? { image } : {})
            };

            let savedBebida: IBebida;
            if (dadosBebidas) {
                const response = await bebidaService.atualizarDadosId(dadosBebidas.id, formattedData);
                if(!response) throw new Error('Failed to update bebida');
                savedBebida = response;
            } else {
                const response = await bebidaService.criarNovoCadastroId(formattedData);
                if (!response) throw new Error('Failed to create bebida');
                savedBebida = response;
            }

            // Upload image if a new file was selected
            if (image && image instanceof File) {
                const imageResponse = await imageService.uploadImage(
                    image,
                    'bebidas',
                    savedBebida.id
                );
                console.log('Image uploaded successfully:', imageResponse);
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