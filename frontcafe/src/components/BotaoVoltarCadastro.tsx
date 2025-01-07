import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface BotaoVoltarCadastroProps {
    href: string;
}

export default function BotaoVoltarCadastro({href}: BotaoVoltarCadastroProps) {

    const navigate = useNavigate();

    return (
        <Button 
            variant="outline" 
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/${href}`);
            }} 
            className="h-10 w-10"
        >
            <ArrowLeft/>
        </Button>
    )
}