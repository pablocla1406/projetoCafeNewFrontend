import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import HookPessoaForm from "./hookPessoaForm";
import { PessoaFormSchema } from "./PessoaSchema";
import { ComboboxDemo } from "@/components/ComboboxDemo"; // Import the ComboboxDemo component
import { ISetor } from "@/utils/interfaces/ISetor";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PessoaFormularioProps = {
  dadosExistentes?: PessoaFormSchema;
  onAdicionarSetor: (Setor: ISetor) => void; // Add the onAdicionarSetor prop
  SetoresFiltradas: ISetor[];
}

export default function PessoaFormulario({ dadosExistentes, onAdicionarSetor, SetoresFiltradas }: PessoaFormularioProps) {
  const { form, handleSubmit, errors, onSubmit } = HookPessoaForm(dadosExistentes);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(async (data) => {
        try {
          await onSubmit(data);
        } catch (error) {
          console.error("Erro na submissão:", error);
        }
      })} className="space-y-10">
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
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Setor</FormLabel>
              <div>
                <ComboboxDemo
                  items={SetoresFiltradas}
                  onSelect={(item) => {
                    if (item?.id && item?.nome) {
                      const setorData = {
                        id: String(item.id),
                        nome: item.nome
                      };
                      field.onChange(setorData);
                      form.setValue("setor", setorData, { shouldValidate: true });
                    }
                  }}
                  onCreate={onAdicionarSetor}
                  selectedValue={field.value}
                />
              </div>
              {errors.setor?.id?.message && (
                <span className="text-sm font-medium text-red-500">
                  {errors.setor.id.message}
                </span>
              )}
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="permissao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <Select 
                onValueChange={(value) => {
                  const permissao = value as "ADMIN" | "USER" | "AUX";
                  field.onChange(permissao);
                  form.setValue("permissao", permissao, { shouldValidate: true });
                }}
                defaultValue={field.value}
              >
                <SelectTrigger 
                  className="w-[180px] bg-zinc-800 text-white"
                >
                  <SelectValue defaultValue={field.value}>
                    {field.value === 'ADMIN' ? 'Administração' :
                     field.value === 'USER' ? 'Funcionário' :
                     field.value === 'AUX' ? 'Auxiliar Admin' :
                     'Selecione a Permissão'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent 
                  position="popper" 
                  side="right" 
                  className="bg-zinc-800 text-white border-zinc-700 min-w-[180px]"
                >
                  <SelectGroup>
                    <SelectLabel className="text-zinc-400">Permissões</SelectLabel>
                    <SelectItem 
                      value="ADMIN"
                      className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                    >
                      Administração
                    </SelectItem>
                    <SelectItem 
                      value="USER"
                      className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                    >
                      Funcionário
                    </SelectItem>
                    <SelectItem 
                      value="AUX"
                      className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700"
                    >
                      Auxiliar Admin
                    </SelectItem>
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