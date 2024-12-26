import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import HookPessoaForm from "./hookPessoaForm";
import { PessoaFormSchema } from "./schema";
import { ComboboxDemo } from "@/components/ComboboxDemo"; // Import the ComboboxDemo component
import { IFuncao } from "@/utils/interfaces/IFuncao";
import { Button } from "../ui/button";

type PessoaFormularioProps = {
  dadosExistentes?: PessoaFormSchema;
  onAdicionarFuncao: (funcao: IFuncao) => void; // Add the onAdicionarFuncao prop
  funcaosFiltradas: IFuncao[];
}

export default function PessoaFormulario({ dadosExistentes, onAdicionarFuncao, funcaosFiltradas }: PessoaFormularioProps) {
  const { form, handleSubmit, errors, onSubmit } = HookPessoaForm(dadosExistentes);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <Input {...field} type="file" />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <Input {...field} placeholder="Digite o Usuário" />
              {errors.usuario?.message && <FormMessage>{errors.usuario.message}</FormMessage>}
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <Input {...field} placeholder="Digite a Senha" />
              {errors.senha?.message && <FormMessage>{errors.senha.message}</FormMessage>}
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="funcao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <ComboboxDemo
                items={funcaosFiltradas} // Pass the todasFuncoes prop
                onSelect={field.onChange}
                onCreate={onAdicionarFuncao} // Use the onAdicionarFuncao prop
              />
              {errors.funcao?.message && <FormMessage>{errors.funcao.message}</FormMessage>}
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="permissao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione a Permissão"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Permissões</SelectLabel>
                        <SelectItem value="ADMIN">Adminstração</SelectItem>
                        <SelectItem value="USER">Funcionário</SelectItem>
                        <SelectItem value="AUX">Auxiliar Admin</SelectItem>
                    </SelectGroup>
                </SelectContent>
              </Select>
              {errors.permissao?.message && <FormMessage>{errors.permissao.message}</FormMessage>}
            </FormItem>
          )}
        ></FormField>

        <Button type="submit">Salvar</Button>
        
      </form>
    </Form>
  );
}