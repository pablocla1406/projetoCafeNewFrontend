import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import HookLogin from "./hookLogin"
import { FormMessage } from "@/components/ui/form"

export default function LoginForm() {
    const { form, handleSubmit, errors, onSubmit } = HookLogin()
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login do Usuário</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Entre com o seu Usuário e Senha para ser feito o Login
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="usuario">Usuário</Label>
                    <Input 
                        {...form.register("usuario")}
                        id="usuario" 
                        type="text" 
                        placeholder="Digite seu Usuário" 
                    />
                    {errors.usuario?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.usuario.message}</FormMessage>}

                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="senha">Senha</Label>
                        <a
                            className="ml-auto text-sm underline-offset-4 hover:text-primary hover:underline hover:cursor-pointer"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Mande uma mensagem para a Carla, por favor"
                        >
                            Esqueceu sua senha?
                        </a>
                    </div>
                    <Input 
                        {...form.register("senha")}
                        id="senha" 
                        type="password" 
                        placeholder="••••••••" 
                    />
                    {errors.senha?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.senha.message}</FormMessage>}

                </div>
                <Button type="submit" onClick={() => {navigate("/Home")}}>Entrar</Button>
                </div>
        </form>
    )
}