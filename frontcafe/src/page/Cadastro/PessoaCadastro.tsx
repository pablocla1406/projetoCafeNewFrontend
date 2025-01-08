import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pessoaService } from "@/service/PessoaService";
import { setorService } from "@/service/setorService";
import { PessoaFormSchema } from "@/components/Formularios/FormPessoa/PessoaSchema";
import { ISetor } from "@/utils/interfaces/ISetor";
import { toast } from "sonner";
import PessoaFormulario from "@/components/Formularios/FormPessoa/PessoaFormulario";

export default function PessoaCadastro() {
    const { id } = useParams();
    const [dadosExistentes, setDadosExistentes] = useState<PessoaFormSchema | undefined>(undefined);
    const [setoresFiltrados, setSetoresFiltrados] = useState<ISetor[]>([]);

    useEffect(() => {
        async function carregarDados() {
            if (id) {
                try {
                    const dados = await pessoaService.listarDadosId(id);
                    setDadosExistentes(dados);
                } catch (error) {
                    console.error("Erro ao carregar dados:", error);
                    toast.error("Erro ao carregar dados da pessoa");
                }
            }
        }
        carregarDados();
    }, [id]);

    useEffect(() => {
        async function carregarSetores() {
            try {
                const setores = await setorService.listarDados();
                setSetoresFiltrados(setores);
            } catch (error) {
                console.error("Erro ao carregar setores:", error);
                toast.error("Erro ao carregar lista de setores");
            }
        }
        carregarSetores();
    }, []);

    async function handleAdicionarSetor(novoSetor: ISetor) {
        try {
            const setorCriado = await setorService.criarNovoCadastroId(novoSetor);
            setSetoresFiltrados(prevSetores => [...prevSetores, setorCriado]);
            toast.success("Setor adicionado com sucesso!");
            return setorCriado;
        } catch (error) {
            console.error("Erro ao adicionar setor:", error);
            toast.error("Erro ao adicionar novo setor");
            return null;
        }
    };

    const handleApagarImagem = async (imageName: string) => {
        if (id) {
            try {
                await pessoaService.deleteImagem(id);
                setDadosExistentes(prev => prev ? { ...prev, imagem: null } : undefined);
                toast.success("Imagem removida com sucesso!");
            } catch (error) {
                console.error("Erro ao apagar imagem:", error);
                toast.error("Erro ao remover imagem");
            }
        }
    };

    return (
        <PessoaFormulario
            dadosExistentes={dadosExistentes}
            onAdicionarSetor={handleAdicionarSetor}
            setoresFiltrados={setoresFiltrados}
            onApagarImagem={handleApagarImagem}
        />
    );
}