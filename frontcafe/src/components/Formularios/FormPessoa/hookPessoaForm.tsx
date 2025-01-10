import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { PessoaFormSchema } from "./PessoaSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { pessoaFormSchema } from "./PessoaSchema";
import { useEffect } from "react";

export default function HookPessoaForm(dadosExistentes?: PessoaFormSchema) {
    const navigate = useNavigate();

    const form = useForm<PessoaFormSchema>({
        resolver: zodResolver(pessoaFormSchema),
        defaultValues: {
            id: "",
            nome: "",
            imagem: null,  
            usuario: "",
            senha: "",
            setor: { id: "", nome: "" },
            permissao: "USER"
        }
    });

    const { formState: { errors }, handleSubmit, reset } = form;

    useEffect(() => {
        if (dadosExistentes) {
            reset(dadosExistentes);
        }
    }, [dadosExistentes, reset]);



    

    async function onSubmit(data: PessoaFormSchema) {
        try {
            console.log('Iniciando submissão do formulário:', data);
            let imagemBase64: string | null = null;
    
            // Verifique se a imagem é do tipo File antes de processar
            if (data.imagem instanceof File) {
                console.log('Processando imagem do tipo File');
                imagemBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => {
                        console.error('Erro ao ler arquivo:', error);
                        reject(error);
                    };
                    reader.readAsDataURL(data.imagem as Blob);
                });
            }
    
            // Prepara os dados para envio
            const dadosParaEnvio = {
                ...data,
                imagem: imagemBase64 || (typeof data.imagem === 'string' ? data.imagem : null),
                setorId: data.setor.id,
            };

            console.log('Dados preparados para envio:', dadosParaEnvio);
    
            if (dadosExistentes?.id) {
                console.log('Atualizando pessoa existente');
                await pessoaService.atualizarDadosId(dadosExistentes.id, dadosParaEnvio);
                toast.success('Pessoa atualizada com sucesso!');
                navigate('/ListagemPessoas');
            } else {
                console.log('Criando nova pessoa');
                await pessoaService.criarNovoCadastroId(dadosParaEnvio);
                toast.success('Pessoa cadastrada com sucesso!');
                navigate('/ListagemPessoas');
            }
    
        } catch (error) {
            console.error('Erro detalhado ao salvar pessoa:', error);
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