import { pessoaService } from "@/service/PessoaService";
import { ISetor } from "@/utils/interfaces/ISetor";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";
import { setorService } from "@/service/setorService";
import PessoaFormulario from "@/components/Formularios/FormPessoa/PessoaFormulario";
import { useParams } from "react-router-dom";
import { imageService } from "@/service/ImageService";

export default function PessoaCadastro(){
    const { id } = useParams();
    console.log("ID from params:", id);

    const [pessoa, setPessoa] = useState<IPessoa>({
        id: id || "",
        nome: "",
        setor: {
            id: "",
            nome: ""
        },
        foto: "",
        usuario: "",
        senha: "",
        permissao: "USER"
    });

    const [todosSetores, setTodosSetores] = useState<ISetor[]>([])
    const [setoresFiltrados, setSetoresFiltrados] = useState<ISetor[]>([])

    async function buscarTodosSetores() {
        try {
            const todosOsSetores = await setorService.listarDados()
            console.log("Setores recebidos:", todosOsSetores);
            setSetoresFiltrados(todosOsSetores)
        } catch (error) {
            console.error("Erro ao buscar setores:", error);
        }
    }

    async function receberDadosPessoa(){
        if (id) {
            try {
                console.log("Buscando dados da pessoa com ID:", id);
                const dadosPessoa = await pessoaService.listarDadosId(id);
                console.log("Dados brutos recebidos:", dadosPessoa);

                if (dadosPessoa && typeof dadosPessoa === 'object') {
                    const pessoaFormatada = {
                        id: dadosPessoa.id?.toString() || "",
                        nome: dadosPessoa.nome || "",
                        setor: {
                            id: dadosPessoa.setor?.id?.toString() || "",
                            nome: dadosPessoa.setor?.nome || ""
                        },
                        foto: dadosPessoa.foto || "",
                        usuario: dadosPessoa.usuario || "",
                        senha: dadosPessoa.senha || "",
                        permissao: dadosPessoa.permissao || "USER"
                    };
                    console.log("Dados formatados:", pessoaFormatada);
                    setPessoa(pessoaFormatada);
                } else {
                    console.error("Dados recebidos inválidos:", dadosPessoa);
                }
            } catch (error) {
                console.error("Erro ao buscar dados da pessoa:", error);
            }
        }
    }

    useEffect(() => {
        console.log("useEffect triggered with ID:", id);
        receberDadosPessoa();
        buscarTodosSetores();
    }, [id]);

    async function adicionarSetor(novaSetor : ISetor){
        try {
            if (!novaSetor.id) {
                const novaSetorCriada = await setorService.criarNovoCadastroId(novaSetor);
                setTodosSetores(prev => [...prev, novaSetorCriada]);
                setSetoresFiltrados(prev => [...prev, novaSetorCriada]);
                setPessoa(prev => ({
                    ...prev,
                    setor: novaSetorCriada
                }));
            } else {
                setPessoa(prev => ({
                    ...prev,
                    setor: novaSetor
                }));
            }
        } catch (error) {
            console.error("Erro ao criar novo setor:", error);
        }
    }

    async function handleUploadImage(file: File) {
        try {
            const imageUrl = await imageService.uploadImage(file, "pessoas", pessoa.id);
            setPessoa(prev => ({
                ...prev,
                foto: imageUrl
            }));
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
        }
    }


    async function handleDeleteImage(pessoaId : string){
        try {
            await imageService.deleteImage("pessoas", pessoaId, pessoa.foto);
            setPessoa(prev => ({
                ...prev,
                foto: ""
            }))

        } catch (error) {
            
        }
    }

    console.log("Estado atual da pessoa:", pessoa);
    console.log("Renderizando formulário com dados:", pessoa);

    return(
        <>
            <PessoaFormulario 
                dadosExistentes={pessoa} 
                onAdicionarSetor={adicionarSetor} 
                SetoresFiltradas={setoresFiltrados} 
                onApagarImagem={handleDeleteImage}
            />
        </>
    )
}