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
            imagem: dadosExistentes?.imagem || "",
            usuario: dadosExistentes?.usuario || "",
            senha: dadosExistentes?.senha || "",    
            setor: dadosExistentes?.setor || { id: "", nome: "" },
            permissao: dadosExistentes?.permissao || "USER",
            id: dadosExistentes?.id || "",
        }
    });

    const { formState: { errors }, handleSubmit } = form;

    async function onSubmit(data: PessoaFormSchema) {
        try {
            let imagemBase64: string | null = null;
    
            // Verifique se a imagem é do tipo File antes de processar
            if (data.imagem instanceof File) {
                imagemBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(data.imagem as Blob); // Garantido que é um File
                });
            }
    
            // Prepara os dados para envio
            const dadosParaEnvio = {
                ...data,
                imagem: imagemBase64 || (typeof data.imagem === 'string' ? data.imagem : null), // Usa a imagem convertida ou a string existente
                setorId: data.setor.id, // Ajusta o campo para o formato esperado no backend
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