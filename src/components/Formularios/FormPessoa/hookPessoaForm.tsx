import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pessoaService } from "@/service/PessoaService";
import { PessoaFormSchema } from "./PessoaSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { pessoaFormSchema } from "./PessoaSchema";
import { useEffect } from "react";
import { compressImage } from "@/utils/functions/image/comprimirImage";

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
            permissao: "USER",
            status: "Ativo"
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
            let imagemFinal: `data:image/${string};base64,${string}` | null = null;
    
            // Processa a imagem se for um arquivo
            if (data.imagem instanceof File) {
                try {
                    const imagemComprimida = await compressImage(data.imagem);
                    imagemFinal = imagemComprimida as `data:image/${string};base64,${string}`;
                } catch (error) {
                    return;
                }
            } else if (typeof data.imagem === 'string' && data.imagem.startsWith('data:image/')) {
                imagemFinal = data.imagem as `data:image/${string};base64,${string}`;
            }
    
            // Dados base que são comuns para POST e PUT
            const dadosBase = {
                nome: data.nome,
                imagem: imagemFinal,
                usuario: data.usuario,
                senha: data.senha,
                setor: {
                    id: data.setor.id.toString(),
                    nome: data.setor.nome
                },
                permissao: data.permissao,
                status: data.status
            };


            if (dadosExistentes?.id) {
                const dadosPut = {
                    ...dadosBase,
                    id: dadosExistentes.id
                };
                await pessoaService.atualizarDadosId(dadosExistentes.id, dadosPut);
                toast.success('Pessoa atualizada com sucesso!');
                navigate('/ListagemPessoas');
            } else {
                console.log('Criando nova pessoa');
                await pessoaService.criarNovoCadastroId(dadosBase);
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