import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ComboboxReadOnly } from "@/components/ComboboxReadOnly";

import { PedidoSchema } from "./PedidoSchema";

import HookPedidoForm from "./hookPedidoForm";

import IBebida from "@/utils/interfaces/IBebida";

import IPessoa from "@/utils/interfaces/IPessoa";

import BotaoSalvarCadastro from "@/components/Button/BotaoSalvarCadastro";

import { DatePickerDemo } from "@/components/RelacaoADates/DatePickerDemo";
import BotaoVoltarCadastro from "@/components/Button/BotaoVoltarCadastro";
import { Separator } from "@/components/ui/separator";


type PedidoFormProps = {

  dadosExistentes?: PedidoSchema;

  clientesFiltrados : IPessoa[];

  bebidasFiltradas: IBebida[];

};


export default function PedidoForm({ dadosExistentes, clientesFiltrados, bebidasFiltradas }: PedidoFormProps) {

  const { form, handleSubmit, errors, onSubmit } = HookPedidoForm(dadosExistentes);


  return (

    <Form {...form}>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        <div className="w-[1000px] bg-white dark:bg-zinc-800 rounded-lg shadow-md p-12">

          <BotaoVoltarCadastro href="ListagemPedidos"/>
          <h1 className="text-2xl pb-7 font-extrabold text-center">Formulário de Pedido</h1>
          <Separator orientation="horizontal" className="my-2" />

          <div className="space-y-6">

            <FormField

              control={form.control}

              name="cliente"

              render={({ field }) => {

                return (

                  <FormItem className="space-y-1">

                    <FormLabel className ="text-lg">
                      Cliente 

                    </FormLabel>

                    <ComboboxReadOnly

                      items={clientesFiltrados}

                      onSelect={(item) => {
                        if (item) {
                          const clienteObj = {
                            id: String(item.id),
                            nome: item.nome,
                          };
                          form.setValue("cliente", clienteObj, { shouldValidate: true });
                        }
                      }}
                      

                      selectedValue={field.value || { id: '', nome: '' }}

                      placeholder="Selecione o Cliente"
                      

                      />

                    {errors.cliente?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.cliente.message}</FormMessage>}

                  </FormItem>

                );

              }}

            />



            <FormField

              control={form.control}

              name="bebida"

              render={({ field }) => {

                return (

                  <FormItem className="space-y-1">

                    <FormLabel className ="text-lg">

                      Bebida 

                    </FormLabel>

                    <ComboboxReadOnly

                      placeholder="Selecione a Bebida"

                      items={bebidasFiltradas}

                      onSelect={(item) => {
                        if (item && 'preco' in item) {
                          const bebidaObj = {
                            id: String(item.id),
                            nome: item.nome,
                          };
                          form.setValue("bebida", bebidaObj, { shouldValidate: true });
                          form.setValue("unitario", Number(item.preco), { shouldValidate: true });
                          const quantidade = form.getValues("quantidade");
                          form.setValue("total", Number(item.preco) * quantidade, { shouldValidate: true });
                        }
                      }}

                      selectedValue={field.value || { id: '', nome: '' }}


                    />

                    {errors.bebida?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.bebida.message}</FormMessage>}

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

                    <FormLabel className= "text-lg">

                      Preço Unitário 

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

                    {errors.unitario?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.unitario?.message}</FormMessage>}


                  </FormItem>

                )}

              />



              <FormField

                control={form.control}

                name="quantidade"

                render={({ field }) => (

                  <FormItem className="flex-1">

                    <FormLabel className="text-lg">

                      Quantidade 

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

                    {errors.quantidade?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.quantidade?.message}</FormMessage>}

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

                    <FormLabel className ="text-lg">

                      Total 
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
                  <FormLabel className="text-lg">
                    Data da Compra 
                  </FormLabel>
                  <div className="w-full">
                    <DatePickerDemo
                      date={field.value}
                      setDate={(date) => {
                        field.onChange(date);
                      }}
                    />
                  </div>
                  {errors.data_compra?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.data_compra?.message}</FormMessage>}
                </FormItem>
              )}
            />



            <div className="pt-6 flex items-center justify-center w-full">

              <BotaoSalvarCadastro  disabled={Object.keys(errors).length > 0}/>

            </div>

          </div>

        </div>

      </form>

    </Form>

  );

}
