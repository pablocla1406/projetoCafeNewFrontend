import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import HookPessoaForm from "./hookPessoaForm";
import { PessoaFormSchema } from "./schema";
import { ComboboxDemo } from "@/components/ComboboxDemo"; // Import the ComboboxDemo component
import { ISetor } from "@/utils/interfaces/ISetor";
import { Button } from "../ui/button";

type PessoaFormularioProps = {
  dadosExistentes?: PessoaFormSchema;
  onAdicionarSetor: (Setor: ISetor) => void; // Add the onAdicionarSetor prop
  SetorsFiltradas: ISetor[];
}

export default function PessoaFormulario({ dadosExistentes, onAdicionarSetor, SetorsFiltradas }: PessoaFormularioProps) {
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
          name="setor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <ComboboxDemo
                items={SetorsFiltradas} // Pass the todasFuncoes prop
                onSelect={field.onChange}
                onCreate={onAdicionarSetor} // Use the onAdicionarSetor prop
              />
              {errors.setor?.message && <FormMessage>{errors.setor.message}</FormMessage>}
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