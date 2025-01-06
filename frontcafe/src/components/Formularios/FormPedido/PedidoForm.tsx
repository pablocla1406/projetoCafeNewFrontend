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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Cliente</FormLabel>
                  <ComboboxReadOnly
                    items={clientes}
                    onSelect={(item) => {
                      field.onChange(item.nome);
                    }}
                    selectedValue={clientes.find(c => c.nome === field.value)}
                    placeholder="Selecione o Cliente"
                  />
                  {errors.cliente?.message && (
                    <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.cliente.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bebida"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Bebida</FormLabel>
                  <ComboboxReadOnly
                    items={bebidas}
                    onSelect={(item) => {
                      field.onChange(item.nome);
                      form.setValue("unitario", Number(item.preco));
                      const quantidade = form.getValues("quantidade");
                      form.setValue("total", Number(item.preco) * quantidade);
                    }}
                    selectedValue={bebidas.find(b => b.nome === field.value)}
                    placeholder="Selecione a Bebida"
                  />
                  {errors.bebida?.message && (
                    <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.bebida.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="unitario"
                render={({ field }) => (
                  <FormItem className="flex-1">
                                <FormLabel className=" text-lg">Preço Unitário</FormLabel>
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
                    {errors.unitario?.message && (
                      <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">
                        {errors.unitario.message}
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
                    <FormLabel className="text-lg">Quantidade</FormLabel>
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
                                {errors.quantidade?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.quantidade.message}</FormMessage>}
                  </FormItem>
                )}
                        ></FormField>
                    </div>

                    <div className="flex gap-4">


              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem className="flex-1">
                                <FormLabel className=" dark:text-gray-200 text-lg">Total</FormLabel>
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
                                <FormLabel className=" text-lg">Data da Compra</FormLabel>
                                <div className="w-full">
                                    <DatePickerDemo
                                        date={field.value} 
                                        setDate={(date) => {
                                            field.onChange(date);
                                        }}
                                    />
                                </div>
                                {errors.data_compra?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.dataCompra.message}</FormMessage>}
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
