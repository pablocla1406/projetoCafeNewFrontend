import { bebidaService } from "@/service/BebidaService"
import IBebida from "@/utils/interfaces/IBebida"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BebidaForm from "@/components/Formularios/FormBebidas/BebidaForm"

export default function BebidaCadastro(){
    const [bebida, setBebida] = useState<IBebida>({
        id: "",
        nome: "",
        descricao: "",
        preco: 0,
        image: "",
        status: "Ativo"
    })


    async function receberDados(){
        if(bebida.id){
            await bebidaService.listarDadosId(bebida.id)
        }
        setBebida(bebida)
    }

    useEffect(() => {
        receberDados()
    }, [])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const {name, value} = event.target
        setBebida({
            ...bebida,
            [name]: value
        })
    }

    return(
        <>
            <BebidaForm dados={bebida} />
        </>
    )
}