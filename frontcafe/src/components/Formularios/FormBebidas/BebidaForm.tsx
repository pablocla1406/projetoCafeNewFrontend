import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BebidaSchema } from "./BebidaSchema";
import hookBebidaForm from "./hookBebidaForm";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useState } from "react";

type BebidaFormProps = {
    dados?: BebidaSchema,
}

export default function BebidaForm({dados}: BebidaFormProps){
    const { form, handleSubmit, errors, onSubmit } = hookBebidaForm(dados);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        dados?.image && typeof dados.image === 'string' ? dados.image : null
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return(
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <Input {...field} placeholder="Digite o Nome" />
                            {errors.nome?.message && <FormMessage>{errors.nome.message}</FormMessage>}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <Input {...field} placeholder="Digite a Descrição" />
                            {errors.descricao?.message && <FormMessage>{errors.descricao.message}</FormMessage>}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preco"
                    render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <Input 
                                {...field}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onChange(value === '' ? '' : Number(value));
                                }}
                                type="number" 
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            {errors.preco?.message && <FormMessage>{errors.preco.message}</FormMessage>}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Imagem</FormLabel>
                            <div className="space-y-4">
                                <Input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, onChange)}
                                    {...field}
                                />
                                {previewUrl && (
                                    <div className="relative w-40 h-40">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                )}
                                {errors.image?.message && <FormMessage>{errors.image.message}</FormMessage>}
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione o Status"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="Ativo">Ativo</SelectItem>
                                    <SelectItem value="Inativo">Inativo</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}