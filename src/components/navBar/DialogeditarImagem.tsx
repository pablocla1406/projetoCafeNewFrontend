import { useEffect, useState, useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { compressImage } from "@/utils/functions/image/comprimirImage";
import { pessoaService } from "@/service/PessoaService";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { handleRemoveImage } from "@/utils/functions/image/handleRemoveImage";
import { Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Usuario {
    id: string;
    imagem: File | string | null;
}

interface DialogeditarImagemProps {
    children: React.ReactNode;
}

export default function DialogeditarImagem({ children }: DialogeditarImagemProps) {
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
        let imagemFinal: `data:image/${string};base64,${string}` | null = null;

        if (usuario.imagem instanceof File) {
            try {
                const imagemComprimida = await compressImage(usuario.imagem);
                imagemFinal = imagemComprimida as `data:image/${string};base64,${string}`;
            } catch (error) {
                toast.error('Erro ao comprimir a imagem');
                return;
            }
        } else if (typeof usuario.imagem === 'string' && usuario.imagem.startsWith('data:image/')) {
            imagemFinal = usuario.imagem as `data:image/${string};base64,${string}`;
        }

        try {
            await pessoaService.editarImagemPessoa(usuario.id, imagemFinal);
            toast.success('Imagem atualizada com sucesso!');
            setOpen(false);
            if (imagemFinal) {
                localStorage.setItem('imagem', imagemFinal);
            }
        } catch (error) {
            toast.error('Erro ao atualizar a imagem');
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
                            <div className="relative group">
                                {imagePreview ? (
                                    <div className="relative w-40 h-40">
                                        <img 
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={clearImage}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-40 h-40 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                        <span className="text-gray-500 text-sm text-center px-4">
                                            Clique para selecionar uma imagem
                                        </span>
                                    </div>
                                )}
                            </div>

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