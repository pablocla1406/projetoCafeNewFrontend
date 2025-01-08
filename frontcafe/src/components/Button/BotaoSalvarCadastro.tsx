import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

interface BotaoSalvarCadastroProps {
    href: string,
}

export default function BotaoSalvarCadastro({href}: BotaoSalvarCadastroProps) {
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors } } = useFormContext();

    const onClickHandler = handleSubmit(() => {
        if (Object.keys(errors).length === 0) {
            navigate(`/${href}`);
        } else {
            console.error("Form contains errors:", errors);
        }
    });

    return (
        <Button className="w-full text-1xl" type="submit" variant="default" onClick={onClickHandler} disabled={Object.keys(errors).length > 0}>
            Salvar
        </Button>
    );
}