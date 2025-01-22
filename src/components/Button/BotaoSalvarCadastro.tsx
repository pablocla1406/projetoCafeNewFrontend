import { Button } from "../ui/button";

interface BotaoSalvarCadastroProps {
    disabled?: boolean;
}

export default function BotaoSalvarCadastro({ disabled }: BotaoSalvarCadastroProps) {
    return (
        <Button 
            className="w-full text-1xl btnBonito" 
            type="submit" 
            variant="default" 
            disabled={disabled}
        >
            Salvar
        </Button>
    );
}