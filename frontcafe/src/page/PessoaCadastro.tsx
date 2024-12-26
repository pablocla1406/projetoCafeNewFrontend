import PessoaFormulario from "@/components/FormPessoa/PessoaFormulario";
import { funcaoService } from "@/service/funcaoService";
import { pessoaService } from "@/service/PessoaService";
import { IFuncao } from "@/utils/interfaces/IFuncao";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";

export default function PessoaCadastro(){
    const [pessoa, setPessoa] = useState<IPessoa>({
        id: "",
        nome: "",
        funcao: {
            id: "",
            nome: ""
        },
        foto: "",
        usuario: "",
        senha: "",
        permissao: "USER"
    })

    const [todasFuncoes, setTodasFuncoes] = useState<IFuncao[]>([])
    const [funcoesFiltradas, setFuncoesFiltradas] = useState<IFuncao[]>([])


    async function buscarTodasFuncoes() {
        const todasAsFuncoes = await funcaoService.listarDados()
        
        setTodasFuncoes(todasAsFuncoes)
    }

    function FiltrarFuncoes(termo : string){
        const resultadoFiltro = todasFuncoes.filter(funcao =>
            funcao.nome.toLowerCase().includes(termo.toLowerCase())
        )

        setFuncoesFiltradas(resultadoFiltro)
    }

   

    async function receberDadosPessoa(){
        if (pessoa.id) {
            const dadosPessoa = await pessoaService.listarDadosID(pessoa.id)
            setPessoa(dadosPessoa)
        }
    }

    useEffect(()=>{
        receberDadosPessoa()
        buscarTodasFuncoes()
    }, [])

    async function AdicionarFuncao(novafuncao : IFuncao){
        
        if (!todasFuncoes.some(funcao => funcao.id === novafuncao.id)) {
            try {
                const novaFuncaoCriada = await funcaoService.criarNovoCadastroID(novafuncao);

                setTodasFuncoes([
                    ...todasFuncoes,
                    novaFuncaoCriada
                ]);

                setPessoa({
                    ...pessoa,
                    funcao: novaFuncaoCriada
                });
            } catch (error) {
                console.error("Erro ao criar nova função:", error);
            }
        } else {
            setPessoa({
                ...pessoa,
                funcao: novafuncao
            });
        }
    }

    

    function handleChange(event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target

        setPessoa({
                ...pessoa,
                [name] : value
            })}

    async function FormSubmit(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        const {id, ...dadosPessoaAtualizado} = pessoa

        try {
            if(pessoa.id){
                await pessoaService.atualizarDadosID(id, dadosPessoaAtualizado)
            }
            else{
                await pessoaService.criarNovoCadastroID(dadosPessoaAtualizado)
            }
        } catch (error) {
            console.error("Erro ao salvar dados da pessoa:", error);
        }
    }

    return(
        <>
        <PessoaFormulario dadosExistentes={pessoa} onAdicionarFuncao={AdicionarFuncao} funcaosFiltradas={funcoesFiltradas} />
        </>
    )
}