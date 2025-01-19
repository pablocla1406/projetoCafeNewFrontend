import { bebidaService } from "@/service/BebidaService"
import IBebida from "@/utils/interfaces/IBebida"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BebidaForm from "@/components/Formularios/FormBebidas/BebidaForm"
import { BebidaSchema } from "@/components/Formularios/FormBebidas/BebidaSchema"

export default function BebidaCadastro(){
    const { id } = useParams();

    const [bebida, setBebida] = useState<IBebida>({
        id: id || "",
        nome: "",
        descricao: "",
        preco: 0,
        imagem: null,
        status: "Ativo"
    })

    async function receberDados(){
        if(id){
            try {
                const dadosBebida = await bebidaService.listarDadosId(id)
                
                const formattedData : BebidaSchema= {
                    id: dadosBebida.id.toString(),
                    nome: dadosBebida.nome,
                    descricao: dadosBebida.descricao,
                    preco: Number(dadosBebida.preco),
                    imagem: dadosBebida.imagem || "",
                    status: dadosBebida.status
                };
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
            <BebidaForm dados={bebida} />
        </>
    )
}