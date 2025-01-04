import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function FormLogindaaaa({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const navigate = useNavigate();
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login de Usuário</h1>
        <p className="text-balance text-sm text-muted-foreground">
            Entre com o seu Usuário e Senha para ser feito o Login
        
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="Usuario">Usuário</Label>
          <Input id="Usuario" type="Usuario" placeholder="Digite seu Usuário" required />
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
          <Input id="senha" type="senha" placeholder="••••••••" required />
        </div>
        <Button type="submit" onClick={() => {navigate("/Home")}}>Entrar</Button>
        
        {/* <BotaoSalvarCadastro href="/Home"/> */}
      </div>
    </form>
  )
}
