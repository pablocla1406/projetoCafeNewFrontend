import { Settings } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/darkMode&Toggle/toggle-moddle";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/darkMode&Toggle/themeprovider"
import { useFont } from "@/hooks/useFont";
import DefinirFonte from "./DefinirFonte";

interface dialogConfigProps {
    style: string;
    showButton?: boolean;
    children?: React.ReactNode;
}

export default function DialogConfig({style, showButton = true, children}: dialogConfigProps) {
    const { theme, setTheme } = useTheme();
    const { font, setFont } = useFont();
    const [open, setOpen] = useState(false);

    const [tempConfig, setTempConfig] = useState({
        theme: theme,
        font: font
    });

    useEffect(() => {
        setTempConfig(prev => ({
            ...prev,
            theme,
            font
        }));
    }, [theme, font]);

    const handleSave = () => {
        setTheme(tempConfig.theme);
        setFont(tempConfig.font);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {showButton ? (
                    <Button variant="outline" size="icon" className="h-9 w-9 px-0">
                        <Settings className={style} />
                    </Button>
                ) : children}
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Configuração Sistema</DialogTitle>
                    <DialogDescription>
                        Ajuste a Aparência do Sistema
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }} className="space-y-6">
                    <ModeToggle tempConfig={tempConfig} setTempConfig={setTempConfig} />
                    <DefinirFonte 
                        setFont={tempConfig.font} 
                        setTempFont={(font) => setTempConfig({ ...tempConfig, font })} 
                    />
                    <DialogFooter className="gap-3">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="btnBonito" >Salvar alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}