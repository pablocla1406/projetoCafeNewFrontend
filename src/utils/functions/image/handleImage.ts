import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";

interface HandleImageChangeProps {
  event: React.ChangeEvent<HTMLInputElement>;
  setImagePreview: (value: string | null) => void;
  form?: UseFormReturn<any>;
}

export const handleImageChange = ({ event, setImagePreview, form }: HandleImageChangeProps) => {
  const file = event.target.files?.[0];
  
  if (file) {
    const validImageTypes = ['image/jpeg', 'image/png'];
    
    if (validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        form?.setValue("imagem", file);
      };
      reader.readAsDataURL(file);
      toast.success("Imagem carregada com sucesso!");
    } else {
      setImagePreview(null);
      form?.setValue("imagem", null);
      toast.error("O arquivo selecionado não é uma imagem válida");
      resetFileInput();
    }
  } else {
    setImagePreview(null);
    form?.setValue("imagem", null);
    resetFileInput();
  }
};

const resetFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};