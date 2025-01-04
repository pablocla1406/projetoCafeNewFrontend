import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BebidaSchema } from "./BebidaSchema";
import hookBebidaForm from "./hookBebidaForm";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useState } from "react";
import BotaoSalvarCadastro from "@/components/BotaoSalvarCadastro";
import { Trash2 } from "lucide-react";

type BebidaFormProps = {
    dados?: BebidaSchema,
    onApagarImagem: (imageName: string) => void;
}


export default function BebidaForm({dados, onApagarImagem}: BebidaFormProps){
    const { form, handleSubmit, errors, onSubmit } = hookBebidaForm(dados);

    return(
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="w-[1000px] bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-12">
                    <h1 className="text-2xl pb-7 font-extrabold text-gray-900 dark:text-white text-center">Formulário de Bebidas</h1>
                <div className="space-y-6">

                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <Input {...field} placeholder="Digite o Nome" className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                            {errors.nome?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</FormMessage>}
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="descricao"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <Input {...field} placeholder="Digite a Descrição" className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"/>
                            {errors.descricao?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.descricao.message}</FormMessage>}
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
                                className=""/>
                            {errors.preco?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.preco.message}</FormMessage>}
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200 text-lg">Imagem</FormLabel>
                        <div className="flex flex-col gap-2">
                          <Input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) onChange(file);
                            }}
                            className="w-full h-15 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-700 file:text-zinc-100 hover:file:bg-zinc-600"
                          />
                          {value && typeof value === 'string' && (
                            <div className="flex items-center gap-2 mt-2">
                              <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  onApagarImagem(value);
                                  onChange(null);
                                }}
                                className="flex items-center gap-1"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remover
                              </Button>
                            </div>
                          )}
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
                <BotaoSalvarCadastro href="ListagemBebidas"  />

                    </div>
                    </div>
            </form>
        </Form>
    )
}