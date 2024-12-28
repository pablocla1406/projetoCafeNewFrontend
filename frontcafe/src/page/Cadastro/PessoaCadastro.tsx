import { pessoaService } from "@/service/PessoaService";
import { ISetor } from "@/utils/interfaces/ISetor";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";
import { setorService } from "@/service/setorService";
import PessoaFormulario from "@/components/Formularios/FormPessoa/PessoaFormulario";

export default function PessoaCadastro(){
    const [pessoa, setPessoa] = useState<IPessoa>({
        id: "",
        nome: "",
        setor: {
            id: "",
            nome: ""
        },
        foto: "",
        usuario: "", // Ensure this is always a string and not undefined
        senha: "",
        permissao: "USER"
    })

    const [todasFuncoes, setTodasFuncoes] = useState<ISetor[]>([])
    const [funcoesFiltradas, setFuncoesFiltradas] = useState<ISetor[]>([])


    async function buscarTodasFuncoes() {
        const todasAsFuncoes = await setorService.listarDados()
        
        setFuncoesFiltradas(todasAsFuncoes)
    }

    // function filtrarFuncoes(termo : string){
    //     const resultadoFiltro = todasFuncoes.filter(Setor =>
    //         Setor.nome.toLowerCase().includes(termo.toLowerCase())
    //     )

    //     setFuncoesFiltradas(resultadoFiltro)
    // }

   

    async function receberDadosPessoa(){
        if (pessoa.id) {
            const dadosPessoa = await pessoaService.listarDadosId(pessoa.id)
            setPessoa(dadosPessoa)
        }
    }

    useEffect(()=>{
        receberDadosPessoa()
        buscarTodasFuncoes()
    }, [])

    async function adicionarSetor(novaSetor : ISetor){
        
        if (!todasFuncoes.some(setor => setor.id === novaSetor.id)) {
            try {
                const novaSetorCriada = await setorService.criarNovoCadastroId(novaSetor);

                setTodasFuncoes([
                    ...todasFuncoes,
                    novaSetorCriada
                ]);

                setPessoa({
                    ...pessoa,
                    setor: novaSetorCriada
                });
            } catch (error) {
                console.error("Erro ao criar nova função:", error);
            }
        } else {
            setPessoa({
                ...pessoa,
                setor: novaSetor
            });
        }
    }

        

    return(
        <>
        <PessoaFormulario dadosExistentes={pessoa} onAdicionarSetor={adicionarSetor} SetoresFiltradas={funcoesFiltradas} />
        </>
    )
}