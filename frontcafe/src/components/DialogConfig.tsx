import { Settings } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./darkMode&Toggle/toggle-moddle";
import { useState } from "react";
import { useTheme, type Theme } from "@/components/darkMode&Toggle/themeprovider"
import DefinirFonte from "./DefinirFonte";

export default function DialogConfig() {
    const { theme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);

    const [tempConfig, setTempConfig] = useState({
        theme: theme
    });


    const [tempFont, setTempFont] = useState("sans");

    const handleSave = () => {
        setTheme(tempConfig.theme);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="hover:bg-muted-foreground hover:cursor-pointer">
                <Settings className="h-5 w-5" />
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[500px] p-6">
                <DialogHeader className="text-left">
                    <DialogTitle>Configuração Sistema</DialogTitle>
                    <DialogDescription>
                        Ajuste a Aparência do Sistema
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}>
                    <div className="py-6">
                        <ModeToggle tempConfig={tempConfig} setTempConfig={setTempConfig} />
                    </div>
                    <div className="py-6">
                        <DefinirFonte setFont={tempFont} setTempFont={setTempFont} />

                    </div>
                    <DialogFooter className="gap-3">
                        <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Salvar alterações</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}