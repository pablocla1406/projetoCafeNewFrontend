import { UseFormReturn } from "react-hook-form";

interface HandleRemoveImageProps {
  setImagePreview: (value: string | null) => void;
  form?: UseFormReturn<any>;
}

export const handleRemoveImage = ({ setImagePreview, form }: HandleRemoveImageProps) => {
  setImagePreview(null);
  form?.setValue("imagem", null);
  
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
};