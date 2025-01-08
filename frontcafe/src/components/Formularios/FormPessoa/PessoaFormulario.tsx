import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import HookPessoaForm from "./hookPessoaForm";
import { PessoaFormSchema } from "./PessoaSchema";
import { ComboboxDemo } from "@/components/ComboboxDemo"; // Import the ComboboxDemo component
import { ISetor } from "@/utils/interfaces/ISetor";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import BotaoSalvarCadastro from "@/components/Button/BotaoSalvarCadastro";
import BotaoVoltarCadastro from "@/components/Button/BotaoVoltarCadastro";

type PessoaFormularioProps = {
  dadosExistentes?: PessoaFormSchema;
  onAdicionarSetor: (Setor: ISetor) => void; // Add the onAdicionarSetor prop
  setoresFiltrados: ISetor[];
  onApagarImagem: (imageName: string) => void
}

export default function PessoaFormulario({ dadosExistentes, onAdicionarSetor, setoresFiltrados, onApagarImagem }: PessoaFormularioProps) {
  const { form, handleSubmit, errors, onSubmit } = HookPessoaForm(dadosExistentes);

  return (

    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} 
      className="space-y-10">
        <div className="w-[1000px] bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-12">
        <BotaoVoltarCadastro href="ListagemPedidos"/>
        <h1 className="text-2xl pb-7 font-extrabold text-gray-900 dark:text-white text-center">Formulário de Pessoa</h1>
        <div className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Nome</FormLabel>
                  <Input 
                    {...field} 
                    placeholder="Digite o Nome" 
                    className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                  />
                  {errors.nome?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</FormMessage>}
                </FormItem>
              )}/>
            <FormField
              control={form.control}
              name="foto"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Foto</FormLabel>
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
              )}/>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="usuario"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" text-lg">Usuário</FormLabel>
                    <Input {...field} placeholder="Digite o Usuário" 
                    className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                    {errors.usuario?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.usuario.message}</FormMessage>}
                  </FormItem>
                )}/>
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" text-lg">Senha</FormLabel>
                    <Input {...field} placeholder="Digite a Senha" className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                    {errors.senha?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.senha.message}</FormMessage>}
                  </FormItem>
                )}/>
            </div>
            <FormField
              control={form.control}
              name="setor"
              render={({ field }) => {
                console.log("FormField setor value:", field.value);
                const setorValue = field.value && typeof field.value === 'object' 
                  ? field.value 
                  : { id: "", nome: field.value || "" };
                
                return (
                  <FormItem>
                    <FormLabel className=" text-lg">Setor</FormLabel>
                    <div className="w-full">
                      <ComboboxDemo
                        placeholder="Selecione o Setor"
                        items={setoresFiltrados}
                        onSelect={(item) => {
                          console.log("ComboboxDemo onSelect:", item);
                          if (item) {
                            const setorData = {
                              id: String(item.id),
                              nome: item.nome
                            };
                            field.onChange(setorData);
                            form.setValue("setor", setorData, { shouldValidate: true });
                          }
                        }}
                        onCreate={onAdicionarSetor}
                        selectedValue={setorValue}
                      />
                    </div>
                    {errors.setor?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.setor?.message}</FormMessage>}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="permissao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Permissão</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      if (value) {
                        const permissao = value as "ADMIN" | "USER" | "AUX";
                        field.onChange(permissao);
                        form.setValue("permissao", permissao, { shouldValidate: true });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full h-11 text-white border-zinc-700">
                      <SelectValue>
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
                        <SelectItem value="ADMIN" className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700">Administração</SelectItem>
                        <SelectItem value="USER" className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700">Funcionário</SelectItem>
                        <SelectItem value="AUX" className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700">Auxiliar Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.permissao?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.permissao.message}</FormMessage>}
                </FormItem>
              )}/>
            <div className="pt-6 flex items-center justify-center w-full">
              <BotaoSalvarCadastro href="ListagemPessoas" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}