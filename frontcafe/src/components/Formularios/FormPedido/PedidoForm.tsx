import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ComboboxReadOnly } from "@/components/ComboboxReadOnly";

import { PedidoSchema } from "./PedidoSchema";

import HookPedidoForm from "./hookPedidoForm";

import IBebida from "@/utils/interfaces/IBebida";

import IPessoa from "@/utils/interfaces/IPessoa";

import BotaoSalvarCadastro from "@/components/BotaoSalvarCadastro";

import { DatePickerDemo } from "@/components/DatePickerDemo";


type PedidoFormProps = {

  dadosExistentes?: PedidoSchema;

  clientes: IPessoa[];

  bebidas: IBebida[];

};


export default function PedidoForm({ dadosExistentes, clientes, bebidas }: PedidoFormProps) {

  const { form, handleSubmit, errors, onSubmit } = HookPedidoForm(dadosExistentes);


  return (

    <Form {...form}>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        <div className="w-[1000px] bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-12">

          <h1 className="text-2xl pb-7 font-extrabold text-gray-900 dark:text-white text-center">Formulário de Pedido</h1>

          <div className="space-y-6">

            <FormField

              control={form.control}

              name="cliente"

              render={({ field }) => {

                const selectedCliente = field.value && typeof field.value === 'object'
                ? field.value
                : {id: '', nome: '', setor: '', foto: '', usuario: '', senha: '', permissao: ''};


                return (

                  <FormItem className="space-y-1">

                    <FormLabel className={`text-lg ${errors.cliente ? 'text-red-500' : ''}`}>

                      Cliente {errors.cliente && '*'}

                    </FormLabel>

                    <ComboboxReadOnly

                      items={clientes}

                      

                      onSelect={(item) => {

                        if (item && 'nome' in item && 'setor' in item && 'foto' in item && 'usuario' in item && 'senha' in item && 'permissao' in item) {
                          const clienteObj = {
                            id: String(item.id),
                            nome: item.nome,
                            setor: item.setor,
                            foto: item.foto,
                            usuario: item.usuario,
                            senha: item.senha,
                            permissao: item.permissao
                          };
                          field.onChange(clienteObj);
                        }
                      }}
                      

                      selectedValue={selectedCliente}
                      

                      placeholder="Selecione o Cliente"
                      

                      />

                    {errors.cliente && (

                      <FormMessage className="text-red-500">

                        Cliente é obrigatório

                      </FormMessage>

                    )}

                  </FormItem>

                );

              }}

            />



            <FormField

              control={form.control}

              name="bebida"

              render={({ field }) => {

                const selectedBebida = field.value && typeof field.value === 'object'
                ? field.value
                : {id: '', nome: '', preco: '', descricao: '', image: '', status: ''};


                  console.log("selectedBebida:", selectedBebida, "field.value:", field.value, "bebidas:", bebidas);


                return (

                  <FormItem className="space-y-1">

                    <FormLabel className={`text-lg ${errors.bebida ? 'text-red-500' : ''}`}>

                      Bebida {errors.bebida && '*'}

                    </FormLabel>

                    <ComboboxReadOnly

                      placeholder="Selecione a Bebida"

                      items={bebidas}

                      onSelect={(item) => {
                        if (item && 'preco' in item) {
                          const bebidaObj = {
                            id: String(item.id),
                            nome: item.nome,
                            preco: Number(item.preco),
                            descricao: item.descricao,
                            image: item.image,
                            status: item.status
                          };
                          field.onChange(bebidaObj);
                          
                          form.setValue("unitario", Number(item.preco));
                          const quantidade = form.getValues("quantidade");
                          form.setValue("total", Number(item.preco) * quantidade);
                        }
                      }}

                      selectedValue={selectedBebida}


                    />

                    {errors.bebida && (

                      <FormMessage className="text-red-500">

                        Bebida é obrigatória

                      </FormMessage>

                    )}

                  </FormItem>

                );

              }}

            />



            <div className="flex gap-4">

              <FormField

                control={form.control}

                name="unitario"

                render={({ field }) => (

                  <FormItem className="flex-1">

                    <FormLabel className={`text-lg ${errors.unitario ? 'text-red-500' : ''}`}>

                      Preço Unitário {errors.unitario && '*'}

                    </FormLabel>

                    <div className="relative">

                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">

                        R$

                      </span>

                      <Input

                        className="w-full h-11 pl-8 pr-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

                        type="number"

                        min="0"

                        step="0.01"

                        placeholder="Digite o preço unitário"

                        {...field}

                        onChange={(e) => {

                          const value = Number(e.target.value);

                          field.onChange(value);

                          const quantidade = form.getValues("quantidade");

                          form.setValue("total", value * quantidade);

                        }}

                      />

                    </div>

                    {errors.unitario && (

                      <FormMessage className="text-red-500">

                        Preço unitário é obrigatório

                      </FormMessage>

                    )}

                  </FormItem>

                )}

              />



              <FormField

                control={form.control}

                name="quantidade"

                render={({ field }) => (

                  <FormItem className="flex-1">

                    <FormLabel className={`text-lg ${errors.quantidade ? 'text-red-500' : ''}`}>

                      Quantidade {errors.quantidade && '*'}

                    </FormLabel>

                    <Input

                      className="w-full h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"

                      type="number"

                      placeholder="Digite a quantidade"

                      {...field}

                      onChange={(e) => {

                        const value = Number(e.target.value);

                        field.onChange(value);

                        const unitario = form.getValues("unitario");

                        form.setValue("total", unitario * value);

                      }}

                    />

                    {errors.quantidade && (

                      <FormMessage className="text-red-500">

                        Quantidade é obrigatória

                      </FormMessage>

                    )}

                  </FormItem>

                )}

              />

            </div>



            <div className="flex gap-4">



              <FormField

                control={form.control}

                name="total"

                render={({ field }) => (

                  <FormItem className="flex-1">

                    <FormLabel className={`text-lg ${errors.total ? 'text-red-500' : ''}`}>

                      Total {errors.total && '*'}

                    </FormLabel>

                    <div className="relative">

                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">

                        R$

                      </span>

                      <Input

                        className="w-full h-11 pl-8 pr-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

                        type="number"

                        min="0"

                        step="0.01"

                        placeholder="Total"

                        disabled

                        {...field}

                      />

                    </div>

                  </FormItem>

                )}

              />

            </div>



            <FormField

              control={form.control}

              name="data_compra"

              render={({ field }) => (

                <FormItem className="flex-1">

                  <FormLabel className={`text-lg ${errors.data_compra ? 'text-red-500' : ''}`}>

                    Data da Compra {errors.data_compra && '*'}

                  </FormLabel>

                  <div className="w-full">

                    <DatePickerDemo

                      date={field.value}

                      setDate={(date) => {

                        field.onChange(date);

                      }}

                    />

                  </div>

                  {errors.data_compra && (

                    <FormMessage className="text-red-500">

                      Data da compra é obrigatória

                    </FormMessage>

                  )}

                </FormItem>

              )}

            />



            <div className="pt-6 flex items-center justify-center w-full">

              <BotaoSalvarCadastro href="ListagemPedidos" />

            </div>

          </div>

        </div>

      </form>

    </Form>

  );

}
