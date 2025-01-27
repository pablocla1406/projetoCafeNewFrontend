import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BebidaSchema } from "./BebidaSchema";
import hookBebidaForm from "./hookBebidaForm";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Trash2 } from "lucide-react";
import BotaoVoltarCadastro from "@/components/Button/BotaoVoltarCadastro";
import BotaoSalvarCadastro from "@/components/Button/BotaoSalvarCadastro";
import { useState } from "react";
import { handleImageChange } from "@/utils/functions/image/handleImage";
import { handleRemoveImage } from "@/utils/functions/image/handleRemoveImage";
import { Separator } from "@/components/ui/separator";

type BebidaFormProps = {
    dados?: BebidaSchema,
}

export default function BebidaForm({ dados,  }: BebidaFormProps) {
    const { form, handleSubmit, errors, onSubmit } = hookBebidaForm(dados);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="w-full mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-12">
                    <BotaoVoltarCadastro href="ListagemBebidas"/>
                    <h1 className="text-2xl pb-7 font-extrabold  text-center">Formulário de Bebidas</h1>
                    <Separator orientation="horizontal" className="my-2" />
                    <div className="space-y-6">


                        <div className="flex gap-4">

                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-lg">Nome</FormLabel>
                                        <Input {...field} placeholder="Digite o Nome"
                                            className="w-full h-11 px-3 py-2 dark:placeholder:text-white border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                                        {errors.nome?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="descricao"
                                render={({ field }) => (
                                    <FormItem className="flex-1">   
                                        <FormLabel className="text-lg">Descrição</FormLabel>
                                        <Input {...field} placeholder="Digite a Descrição"
                                            className="w-full h-20 px-3 py-2 dark:placeholder:text-white border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                                        {errors.descricao?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.descricao.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="preco"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-lg">Preço</FormLabel>
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                                    R$
                                                </span>
                                                <Input 
                                                    {...field}
                                                    value={value}
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        onChange(value === '' ? '' : Number(value));
                                                    }}
                                                    className="w-full h-11 pl-8 pr-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="defaultPrice"
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            onChange(parseFloat("2.30"));
                                                        } else {
                                                            onChange('');
                                                        }
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                                <label htmlFor="defaultPrice" className="text-sm">Valor padrão de 2,30</label>
                                            </div>
                                            {errors.preco?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.preco.message}</FormMessage>}
                                        </div>
                                    </FormItem>
                                )}
                                
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-lg">Status</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white">
                                                <SelectValue placeholder="Selecione o Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup className="bg-white text-black">
                                                    <SelectLabel className="dark:bg-zinc-900 dark:text-white">Status</SelectLabel>
                                                    <SelectItem className="dark:bg-zinc-900 dark:text-white hover:cursor-pointer" value="Ativo">Ativo</SelectItem>
                                                    <SelectItem className="dark:bg-zinc-900 dark:text-white hover:cursor-pointer" value="Inativo">Inativo</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormField
                            control={form.control}
                            name="imagem"
                            render={({ field: { onChange, value, ...field }}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-200 text-lg">Imagem</FormLabel>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleImageChange({
                                                    event: e,
                                                    setImagePreview,
                                                    form 
                                                })
                                            }}
                                            className="w-full h-15 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:cursor-pointer "
                                        />
                                        {(imagePreview || value) && (
                                            <div className="mt-6 mb-6 flex flex-col items-center space-y-2">
                                                <p className="text-lg mb-2">Preview da imagem da Bebida:</p>
                                                <div className="flex items-center justify-center gap-4 ">
                                                    <img 
                                                        src={imagePreview || (typeof value === 'string' ? value : value instanceof File ? URL.createObjectURL(value) : '')} 
                                                        alt="Preview" 
                                                        className="w-24 h-24 object-cover rounded-lg" 
                                                    />
                                                    <Button 
                                                        variant="destructive" 
                                                        type="button" 
                                                        onClick={() => {
                                                            handleRemoveImage({
                                                                setImagePreview,
                                                                form
                                                            })
                                                        }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remover
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <BotaoSalvarCadastro disabled={Object.keys(errors).length > 0} />

                    </div>
                </div>
            </form>
        </Form>
    )
}