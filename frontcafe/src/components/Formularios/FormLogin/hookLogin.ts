import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./schemaLogin";
import api from "@/service/api";

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
        await api.post('/auth/login', data)
        .then((response) => {
            console.log('Login efetuado com sucesso:', response.data);
        })
        .catch((error) => {
            console.error('Erro ao efetuar login:', error);
        });
    }


    
    return {
        form,
        handleSubmit,
        errors,
        onSubmit
    }
}