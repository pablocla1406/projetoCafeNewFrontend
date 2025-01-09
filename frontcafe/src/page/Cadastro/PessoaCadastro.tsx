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

                    // Encontrar o setor correspondente na lista de setores
                    const setorEncontrado = setoresFiltrados.find(s => s.nome === dados.setor.toString());

                    const dadosFormatados: PessoaFormSchema = {
                        id: dados.id.toString(),
                        nome: dados.nome,
                        imagem: dados.imagem || "",
                        usuario: dados.usuario,
                        senha: dados.senha || "",
                        setor: setorEncontrado ? {
                            id: setorEncontrado.id.toString(),
                            nome: setorEncontrado.nome.toString()
                        } : {
                            id: "",
                            nome: dados.setor.toString()
                        },
                        permissao: dados.permissao,
                    };

                    setDadosExistentes(dadosFormatados);

                } catch (error) {
                    console.error("Erro ao carregar dados:", error);
                    toast.error("Erro ao carregar dados da pessoa");
                }
            }
        }
        carregarDados();
    }, [id, setoresFiltrados]);

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

    return (
        <PessoaFormulario
            dadosExistentes={dadosExistentes}
            onAdicionarSetor={handleAdicionarSetor}
            setoresFiltrados={setoresFiltrados}
        />
    );
}