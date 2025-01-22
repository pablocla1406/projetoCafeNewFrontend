import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

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