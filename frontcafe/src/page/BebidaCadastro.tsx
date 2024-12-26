import { bebidaService } from "@/service/BebidaService"
import IBebida from "@/utils/interfaces/IBebida"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function BebidaCadastro(){
    const [bebida, setBebida] = useState<IBebida>({
        id: "",
        nome: "",
        descricao: "",
        preco: 0,
        image: "",
        status: "Ativo"
    })

    const navigate = useNavigate()



    async function receberDados(){
        if(bebida.id){
            await bebidaService.listarDadosID(bebida.id)
        }
    }

    useEffect(() => {
        receberDados

    }, [bebida.id])


    
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target
        setBebida({
            ...bebida,
            [name]: value
        })
    }
    

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        const {id, ...dadosAtualizados} = bebida
        
        if(bebida.id){
          await bebidaService.atualizarDadosID(id, dadosAtualizados)  
          alert("Dados Atualizados com Sucesso")
          navigate('/Bebidas')
          
        }
        else{
            await bebidaService.criarNovoCadastroID(dadosAtualizados)
            alert("Dados Cadastrados com Sucesso")
            navigate('/Bebidas')
        }
    }


    return(
        <>
           
        </>

    )


    
}