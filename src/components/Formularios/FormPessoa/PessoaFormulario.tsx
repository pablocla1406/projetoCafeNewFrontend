import HookPessoaForm from "./hookPessoaForm";
import { PessoaFormSchema } from "./PessoaSchema";
import { ComboboxDemo } from "@/components/Comboboxs/ComboboxDemo"; // Import the ComboboxDemo component
import { ISetor } from "@/utils/interfaces/ISetor";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Trash2 } from "lucide-react";
import BotaoVoltarCadastro from "@/components/Button/BotaoVoltarCadastro";
import BotaoSalvarCadastro from "@/components/Button/BotaoSalvarCadastro"; // Import the BotaoSalvarCadastro component
import { useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { handleImageChange } from "@/utils/functions/image/handleImage";
import { handleRemoveImage } from "@/utils/functions/image/handleRemoveImage";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

type PessoaFormularioProps = {
  dadosExistentes?: PessoaFormSchema;
  onAdicionarSetor: (Setor: ISetor) => Promise<ISetor>; // Add the onAdicionarSetor prop
  setoresFiltrados: ISetor[];
}

export default function PessoaFormulario({ dadosExistentes, onAdicionarSetor, setoresFiltrados,  }: PessoaFormularioProps) {
  const { form, handleSubmit, errors, onSubmit } = HookPessoaForm(dadosExistentes);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (

    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} 
      className="space-y-10">
        <div className="w-full mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-12">
        <BotaoVoltarCadastro href="ListagemPessoas"/>
        <h1 className="text-2xl pb-7 font-extrabold text-center">Formulário de Pessoa</h1>
        <Separator orientation="horizontal" className="my-2" />
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
                    className="w-2/4 h-11 px-3 py-2 dark:placeholder:text-white border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                  />
                  {errors.nome?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</FormMessage>}
                </FormItem>
              )}/>

            <FormField
              control={form.control}
              name="imagem"
              render={({ field: { value  } }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Foto</FormLabel>
                  <div className="flex flex-col gap-2">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange({ 
                        event: e, 
                        setImagePreview, 
                        form 
                      })}
                      className="w-full h-15 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:cursor-pointer "
                    />
                    {(imagePreview || value) && (
                      <div className="mt-6 mb-6 flex flex-col items-center justify-center">
                        <p className="text-lg mb-2">Preview da imagem do Colaborador:</p>
                        <div className="flex items-center gap-4">
                          
                        <Avatar className="w-20 h-20">
                          <AvatarImage 
                            src={imagePreview || (typeof value === "string" ? value : value instanceof File ? URL.createObjectURL(value) : "")} 
                            className="rounded-full  h-20 w-20"
                            alt="Preview" 
                          />

                        </Avatar>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            handleRemoveImage({ 
                              setImagePreview,
                              form 
                            });
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
              )}/>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="usuario"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" text-lg">Usuário</FormLabel>
                    <Input {...field} placeholder="Digite o Usuário" 
                    className="w-full h-11 px-3 py-2 dark:placeholder:text-white border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                    {errors.usuario?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.usuario.message}</FormMessage>}
                  </FormItem>
                )}/>

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className=" text-lg">Senha</FormLabel>
                    <Input {...field} placeholder="Digite a Senha"
                     className="w-full h-11 px-3 py-2 dark:placeholder:text-white border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white" />
                    {errors.senha?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.senha.message}</FormMessage>}
                  </FormItem>
                )}/>

            </div>


            <div className="flex gap-4">

            <FormField
  control={form.control}
  name="setor"
  render={({ field }) => {
    const setorValue =
      field.value && typeof field.value === "object"
        ? field.value
        : { id: "", nome: field.value || "" };

    return (
      <FormItem className="flex-1">
        <FormLabel className="text-lg">Setor</FormLabel>
        <div className="w-full">
          <ComboboxDemo
            placeholder="Selecione o Setor"
            items={setoresFiltrados}
            onSelect={(item) => {
              if (item) {
                const setorData = {
                  id: String(item.id),
                  nome: item.nome,
                };
                field.onChange(setorData);
                form.setValue("setor", setorData, { shouldValidate: true });
              }
            }}
            onCreate={async (novoSetor) => {
              const setorCriado = await onAdicionarSetor(novoSetor);
              if (setorCriado && setorCriado.id) {
                const setorData = {
                  id: String(setorCriado.id),
                  nome: setorCriado.nome,
                };
                field.onChange(setorData);
                form.setValue("setor", setorData, { shouldValidate: true });
                toast.success("Setor adicionado com sucesso!");
              } else {
                toast.error("Erro ao adicionar setor");
              }
            }}
            selectedValue={setorValue}
          />
        </div>
        {errors.setor?.message && (
          <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">
            {errors.setor?.message}
          </FormMessage>
        )}
      </FormItem>
    );
  }}
/>



              <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-lg">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white hover:cursor-pointer hover:text-[#4a3f35] hover:bg-white">
                      <SelectValue placeholder="Selecione o Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-white text-black">
                        <SelectLabel className="dark:text-white dark:text-white">Status</SelectLabel>
                        <SelectItem className="dark:bg-zinc-900 dark:text-white hover:cursor-pointer hover:text-[#4a3f35] hover:bg-white" value="Ativo" >Ativo</SelectItem>
                        <SelectItem className="dark:bg-zinc-900 dark:text-white hover:cursor-pointer hover:text-[#4a3f35] hover:bg-white" value="Inativo">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
              
            </div>

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
                    <SelectTrigger className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 hover:bg-zinc-100 hover:text-zinc-900 focus:ring-blue-100 dark:bg-zinc-900 dark:text-white">
                      <SelectValue placeholder="Selecione a Permissão">
                        {field.value === 'ADMIN' ? 'Administração' :
                         field.value === 'USER' ? 'Funcionário' :
                         field.value === 'AUX' ? 'Auxiliar Admin' :
                         'Selecione a Permissão'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent 
                      position="popper" 
                      side="bottom"
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg min-w-[250px]"
                    >
                      <SelectGroup>
                        <SelectLabel className="px-3 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          Permissões
                        </SelectLabel>
                        <SelectItem value="ADMIN" className="cursor-pointer px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          Administração
                        </SelectItem>
                        <SelectItem value="USER" className="cursor-pointer px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          Funcionário
                        </SelectItem>
                        <SelectItem value="AUX" className="cursor-pointer px-3 py-2.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          Auxiliar Admin
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> 
                  {errors.permissao?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.permissao.message}</FormMessage>}
                </FormItem>
              )}/>

            <div className="pt-6 flex items-center justify-center w-full">
              <BotaoSalvarCadastro disabled={Object.keys(errors).length > 0} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}