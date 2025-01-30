import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface PreviewParaImagensProps {
    imagePreview: string | null;
    valueCampo?: File | string | null;
    limparImagem: () => void;

}

export default function PreviewParaImagens({ imagePreview, valueCampo, limparImagem }: PreviewParaImagensProps) {
    return (
        <div className="relative group">
                                {(imagePreview || valueCampo) ? (
                                    <div className="relative w-40 h-40">
                                        <img 
                                            src={imagePreview || valueCampo}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={limparImagem}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="w-40 h-40 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                        <span className="text-gray-500 text-sm text-center px-4">
                                            A Imagem Será Exibida Aqui
                                        </span>
                                    </div>
                                )}
                            </div>
    )
}