import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./schemaLogin";
import api from "@/service/api";
import ILoginResponse from "@/utils/interfaces/ILoginResponse";
import { toast } from "sonner";




export default function HookLogin() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            usuario: "",
            senha: "",
        }
    })

    const { handleSubmit, formState: {errors} } = form


    async function onSubmit(data: LoginSchema) {
        try{
            if (!data.usuario || !data.senha) {
                toast.error('Por favor, preencha todos os campos');
                return;
            }

            const response = await api.post<ILoginResponse>('/auth/login', data)
            
            const {token, pessoa} = response.data
            
            localStorage.setItem('token', token)
            localStorage.setItem('pessoa', JSON.stringify(pessoa))
            localStorage.setItem('permissao', pessoa.permissao)



            localStorage.setItem('nome', pessoa.nome)
            localStorage.setItem('usuario', pessoa.usuario)
            localStorage.setItem('imagem', pessoa.imagem)
            localStorage.setItem('pedidosNoMes', pessoa.pedidosNoMes)
            


            const expirantionTime = new Date().getTime() + (24 * 60 * 60 * 1000)
            
            localStorage.setItem('expirationTime', expirantionTime.toString())
            
       api.defaults.headers.common['Authorization'] = `Bearer ${token}`
       
       window.location.href = '/Home'
    }
        catch(error){
            toast.error('Usuário ou senha inválido')
            throw error;
        }
    }
    
    
    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    }
}