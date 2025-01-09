import { bebidaService } from "@/service/BebidaService"
import IBebida from "@/utils/interfaces/IBebida"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BebidaForm from "@/components/Formularios/FormBebidas/BebidaForm"

export default function BebidaCadastro(){
    const { id } = useParams();

    const [bebida, setBebida] = useState<IBebida>({
        id: id || "",
        nome: "",
        descricao: "",
        preco: 0,
        image: "",
        status: "Ativo"
    })

    async function receberDados(){
        if(id){
            try {
                console.log("Fetching data for ID:", id);
                const dadosBebida = await bebidaService.listarDadosId(id)
                console.log("Raw data received:", dadosBebida);
                
                const formattedData = {
                    id: dadosBebida.id.toString(),
                    nome: dadosBebida.nome,
                    descricao: dadosBebida.descricao,
                    preco: Number(dadosBebida.preco),
                    image: dadosBebida.image || "",
                    status: dadosBebida.status
                };
                console.log("Formatted data:", formattedData);
                setBebida(formattedData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error)
            }
        }
    }

    useEffect(() => {
        receberDados()
    }, [id])

    console.log("Current bebida state:", bebida);

    return(
        <>
            <BebidaForm dados={bebida} onApagarImagem={() => {}}/>
        </>
    )
}