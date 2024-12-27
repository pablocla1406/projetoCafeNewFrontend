import { pessoaService } from "@/service/PessoaService";
import IPessoa from "@/utils/interfaces/IPessoa";
import { useEffect, useState } from "react";

export default function Home() {

    const [pessoas, SetPessoas] = useState<IPessoa[]>([]);

    async function getPessoas(){
        const dadosPessoas = await pessoaService.listarDados()
        SetPessoas(dadosPessoas)
    }

    useEffect(() => {
        getPessoas()
    }, [])
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>setor</th>
                        <th>foto</th>
                        <th>usuario</th>
                        <th>senha</th>
                        <th>permissao</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map(pessoa => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.setor.nome}</td>
                            <td><img src={pessoa.foto} alt="Foto" /></td>
                            <td>{pessoa.usuario}</td>
                            <td>{pessoa.senha}</td>
                            <td>{pessoa.permissao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}