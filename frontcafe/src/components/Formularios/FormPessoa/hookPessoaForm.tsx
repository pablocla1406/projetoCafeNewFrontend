import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { pessoaFormSchema, PessoaFormSchema } from "./PessoaSchema";
import { useEffect } from "react";
import { imageService } from "@/service/ImageService";

export default function HookPessoaForm(dadosExistentes?: PessoaFormSchema) {
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
            setor: typeof dadosExistentes?.setor === 'string' 
                ? { id: "", nome: dadosExistentes.setor }
                : dadosExistentes?.setor || { id: "", nome: "" },
            permissao: dadosExistentes?.permissao || "USER"
        }
    });

    const { handleSubmit, formState: { errors }, reset, setValue } = form;

    useEffect(() => {
        console.log("Form reset with data:", dadosExistentes);
        if (dadosExistentes) {
            const formattedSetor = typeof dadosExistentes.setor === 'string'
                ? { id: "", nome: dadosExistentes.setor }
                : dadosExistentes.setor || { id: "", nome: "" };
            
            console.log("Formatted setor:", formattedSetor);
            
            reset({
                ...dadosExistentes,
                permissao: dadosExistentes.permissao || "USER",
                setor: formattedSetor
            });
        }
    }, [dadosExistentes, reset]);

    async function uploadImage(file: File, imageType: string, id: string) {
        return await imageService.uploadImage(file, imageType, id);
    }

    async function deleteImage() {
        const imageType: any = 'pessoas'; 
        const id = form.getValues('id'); 
        const imageName = form.getValues('foto'); 
        await imageService.deleteImage(imageType, id, imageName);
    }

    async function onSubmit(data: PessoaFormSchema) {
        try {
            console.log('Dados a serem enviados:', data);
            if (dadosExistentes?.id && data.foto && !(typeof data.foto === 'string')) {
                try {
                    await deleteImage();
                } catch (error) {
                    console.error('Erro ao excluir imagem:', error);
                    throw error;
                }
            }

            // Chama uploadImage quando uma nova imagem é selecionada
            if (data.foto && !(typeof data.foto === 'string')) {
                if (!form.getValues('id')) {
                    console.error('ID não está disponível para upload da imagem.');
                    throw new Error('ID não está disponível.');
                }
                const imageUrl = await uploadImage(data.foto, 'pessoas', form.getValues('id'));
                data.foto = imageUrl; // Atualiza a URL da imagem no objeto de dados
            }

            // Continue com o envio dos dados do formulário
            if(form.getValues('id')) {
                await pessoaService.atualizarDadosId(Number(form.getValues('id')), {
                    ...data,
                    permissao: data.permissao ,
                    setor: data.setor || { id: Number(data.id), nome: data.nome }
                });
            } else {
                await pessoaService.criarNovoCadastroId({
                    ...data,
                    permissao: data.permissao,
                    setor: data.setor || { id: Number(data.id), nome: data.nome }
                });
            }
            console.log("Operação realizada com sucesso!");
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            throw error;
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit,
        uploadImage,
        deleteImage
    };
}