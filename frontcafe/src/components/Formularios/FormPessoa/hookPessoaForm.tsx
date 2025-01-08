import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { PessoaFormSchema } from "./PessoaSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { pessoaFormSchema } from "./PessoaSchema";

export default function HookPessoaForm(dadosExistentes?: PessoaFormSchema) {
    const navigate = useNavigate();

    const form = useForm<PessoaFormSchema>({
        resolver: zodResolver(pessoaFormSchema),
        defaultValues: {
            nome: dadosExistentes?.nome || "",
            imagem: dadosExistentes?.imagem || null,
            usuario: dadosExistentes?.usuario || "",
            senha: dadosExistentes?.senha || "",
            setor: dadosExistentes?.setor || { id: "", nome: "" },
            permissao: dadosExistentes?.permissao || "USER",
            id: dadosExistentes?.id || "",
            tempFileName: dadosExistentes?.tempFileName || "",
        }
    });

    const { formState: { errors }, handleSubmit } = form;

    async function onSubmit(data: PessoaFormSchema) {
        try {
            let imagemUrl = null;
            
            // Se houver uma imagem para upload
            if (data.imagem instanceof File) {
                try {
                    if (dadosExistentes?.id) {
                        // Upload de imagem para pessoa existente
                        const uploadResponse = await pessoaService.uploadImagem(dadosExistentes.id, data.imagem);
                        imagemUrl = uploadResponse.previewUrl;
                    } else {
                        // Upload de imagem para novo cadastro
                        const uploadResponse = await pessoaService.uploadImagemCadastro(data.imagem);
                        imagemUrl = uploadResponse.previewUrl;
                        data.tempFileName = uploadResponse.tempFileName;
                    }
                } catch (error) {
                    console.error('Erro no upload da imagem:', error);
                    toast.error('Erro ao fazer upload da imagem');
                    return;
                }
            }

            // Prepara os dados para envio
            const dadosParaEnvio = {
                ...data,
                imagem: imagemUrl || data.imagem,
                setorId: data.setor.id
            };

            if (dadosExistentes?.id) {
                await pessoaService.atualizarDadosId(dadosExistentes.id, dadosParaEnvio);
                toast.success('Pessoa atualizada com sucesso!');
            } else {
                await pessoaService.criarNovoCadastroId(dadosParaEnvio);
                toast.success('Pessoa cadastrada com sucesso!');
            }

            navigate('/ListagemPessoas');
        } catch (error) {
            console.error('Erro ao salvar pessoa:', error);
            toast.error('Erro ao salvar os dados');
        }
    }

    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    };
}