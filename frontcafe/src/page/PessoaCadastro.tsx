import PessoaFormulario from "@/components/FormPessoa/PessoaFormulario";
import { SetorService } from "@/service/SetorService";
import { pessoaService } from "@/service/PessoaService";
import { ISetor } from "@/utils/interfaces/ISetor";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";

export default function PessoaCadastro(){
    const [pessoa, setPessoa] = useState<IPessoa>({
        id: "",
        nome: "",
        Setor: {
            id: "",
            nome: ""
        },
        foto: "",
        usuario: "",
        senha: "",
        permissao: "USER"
    })

    const [todasFuncoes, setTodasFuncoes] = useState<ISetor[]>([])
    const [funcoesFiltradas, setFuncoesFiltradas] = useState<ISetor[]>([])


    async function buscarTodasFuncoes() {
        const todasAsFuncoes = await SetorService.listarDados()
        
        setTodasFuncoes(todasAsFuncoes)
    }

    function FiltrarFuncoes(termo : string){
        const resultadoFiltro = todasFuncoes.filter(Setor =>
            Setor.nome.toLowerCase().includes(termo.toLowerCase())
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

    async function AdicionarSetor(novaSetor : ISetor){
        
        if (!todasFuncoes.some(Setor => Setor.id === novaSetor.id)) {
            try {
                const novaSetorCriada = await SetorService.criarNovoCadastroID(novaSetor);

                setTodasFuncoes([
                    ...todasFuncoes,
                    novaSetorCriada
                ]);

                setPessoa({
                    ...pessoa,
                    Setor: novaSetorCriada
                });
            } catch (error) {
                console.error("Erro ao criar nova função:", error);
            }
        } else {
            setPessoa({
                ...pessoa,
                Setor: novaSetor
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
        <PessoaFormulario dadosExistentes={pessoa} onAdicionarSetor={AdicionarSetor} SetorsFiltradas={funcoesFiltradas} />
        </>
    )
}