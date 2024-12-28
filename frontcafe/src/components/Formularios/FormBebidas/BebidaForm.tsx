import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BebidaSchema } from "./BebidaSchema";
import hookBebidaForm from "./hookBebidaForm";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectLabel } from "@radix-ui/react-select";

type BebidaFormProps = {
    dados?: BebidaSchema,
}

export default function BebidaForm({dados}: BebidaFormProps){
    const { form, handleSubmit, errors, onSubmit } = hookBebidaForm(dados);

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
                ></FormField>

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
                ></FormField>

                <FormField
                    control={form.control}
                    name="preco"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <Input {...field} type="number" placeholder="Digite o Preço" />
                            {errors.preco?.message && <FormMessage>{errors.preco.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem</FormLabel>
                            <Input {...field} type="file" />
                        </FormItem>
                    )}
                ></FormField>

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
                ></FormField>

                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}