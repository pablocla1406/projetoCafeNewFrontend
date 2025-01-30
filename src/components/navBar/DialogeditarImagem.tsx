import { useEffect, useState, useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { pessoaService } from "@/service/PessoaService";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import PreviewParaImagens from "../PreviewParaImagens";
import { Upload } from "lucide-react";
import { compressImage } from "@/utils/functions/image/comprimirImage";

interface Usuario {
    id: string;
    imagem: File | string | null;
}

interface DialogeditarImagemProps {
    children: React.ReactNode;
    onImageUpdate?: () => void;
}

export default function DialogeditarImagem({ children, onImageUpdate }: DialogeditarImagemProps) {
    const [open, setOpen] = useState(false);
    const [usuario, setUsuario] = useState<Usuario>({
        id: '',
        imagem: null
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const id = localStorage.getItem('id') || '';
        const imagem = localStorage.getItem('imagem') || '';
        setUsuario({ id, imagem });
        setImagePreview(imagem && imagem.startsWith('data:image/') ? imagem : null);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUsuario({ ...usuario, imagem: file });
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const clearImage = () => {
        setImagePreview(null);
        setUsuario(prev => ({ ...prev, imagem: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            let imagemFinal: string | null = null;

            if (usuario.imagem instanceof File) {
                try {
                    imagemFinal = await compressImage(usuario.imagem);
                } catch (error) {
                    console.error('Erro ao comprimir imagem:', error);
                    toast.error('Erro ao comprimir a imagem');
                    return;
                }
            } else if (typeof usuario.imagem === 'string' && usuario.imagem.startsWith('data:image/')) {
                imagemFinal = usuario.imagem;
            }

            try {
                await pessoaService.editarImagemPessoa(usuario.id, imagemFinal);
                toast.success('Imagem atualizada com sucesso!');
                setOpen(false);
                
                if (imagemFinal) {
                    localStorage.setItem('imagem', imagemFinal);
                } else {
                    localStorage.removeItem('imagem');
                }
                
                onImageUpdate?.();
            } catch (error: any) {
                console.error('Erro ao atualizar imagem:', error);
                toast.error(error.response?.data?.error || 'Erro ao atualizar a imagem');
            }
        } catch (error: any) {
            console.error('Erro geral:', error);
            toast.error('Erro ao processar a operação');
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar imagem</DialogTitle>
                    <DialogDescription>Aqui você pode editar a imagem do seu perfil</DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-6">
                            <PreviewParaImagens imagePreview={imagePreview} limparImagem={clearImage} />

                            <div className="w-full max-w-sm">
                                <label
                                    htmlFor="image-upload"
                                    className={cn(
                                        "flex items-center gap-2 justify-center px-4 py-2 rounded-md border cursor-pointer",
                                        "hover:bg-gray-50 transition-colors duration-200",
                                        "text-sm font-medium",
                                        imagePreview ? "border-primary text-primary" : "border-gray-300 text-gray-700"
                                    )}
                                >
                                    <Upload className="h-4 w-4" />
                                    {imagePreview ? 'Trocar imagem' : 'Selecionar imagem'}
                                </label>
                                <input
                                    id="image-upload"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={!imagePreview}>
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}