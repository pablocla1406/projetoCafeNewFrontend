import IPessoa from "@/utils/interfaces/IPessoa";
import hookPedidoForm from "./hookPedidoForm";
import { PedidoSchema } from "./PedidoSchema";
import IBebida from "@/utils/interfaces/IBebida";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BotaoSalvarCadastro from "@/components/BotaoSalvarCadastro";
import { DatePickerDemo } from "@/components/DatePickerDemo";
import { ComboboxReadOnly } from "@/components/ComboboxReadOnly";
import { Input } from "@/components/ui/input";

// Helper type guards
function isPessoa(item: IPessoa | IBebida): item is IPessoa {
    return 'foto' in item && 'permissao' in item;
}

function isBebida(item: IPessoa | IBebida): item is IBebida {
    return 'descricao' in item && 'preco' in item;
}

type PedidoFormProps = {
    dados?: PedidoSchema,
    clientesFiltrados: IPessoa[];
    bebidasFiltradas: IBebida[];
}

export default function PedidoForm({dados, clientesFiltrados, bebidasFiltradas}: PedidoFormProps){
    const { form, handleSubmit, errors, onSubmit } = hookPedidoForm(dados);

    return(
        <>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="w-[1000px] bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-12">
                <h1 className="text-2xl pb-7 font-extrabold text-gray-900 dark:text-white text-center">Formulário de Pedido</h1>
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="cliente"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" dark:text-gray-200 text-lg">Cliente</FormLabel>
                                <ComboboxReadOnly<IPessoa>
                                    placeholder="Selecione o Cliente"
                                items={clientesFiltrados}
                                onSelect={(item) => {
                                    if(isPessoa(item)){
                                        const dataPedido: IPessoa = {
                                            id: String(item.id),
                                            nome: item.nome,
                                            foto: item.foto,
                                            usuario: item.usuario,
                                            senha: item.senha,
                                            setor: item.setor,
                                            permissao: item.permissao   
                                        }
                                        field.value = dataPedido;
                                        field.onChange(dataPedido);
                                        form.setValue("cliente", dataPedido, { shouldValidate: true });
                                    }
                                }}
                                selectedValue={field.value}                            
                                />
                                {errors.cliente?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.cliente.message}</FormMessage>}
                            </FormItem>
                        )}
                        ></FormField>

                    <FormField
                        control={form.control}
                        name="bebida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" dark:text-gray-200 text-lg">Bebida</FormLabel>
                                <ComboboxReadOnly<IBebida>
                                    placeholder="Selecione a Bebida"
                                    items={bebidasFiltradas}
                                    onSelect={(item) => {
                                        if(isBebida(item)){
                                            const dataBebida: IBebida = {
                                                id: String(item.id),
                                                nome: item.nome,
                                                descricao: item.descricao,
                                                preco: item.preco,
                                            image: item.image,
                                            status: item.status
                                        }
                                        field.value = dataBebida;
                                        field.onChange(dataBebida);
                                        form.setValue("bebida", dataBebida, { shouldValidate: true });
                                    }
                                }}
                                selectedValue={field.value}                            
                                />
                                {errors.bebida?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.bebida.message}</FormMessage>}
                            </FormItem>
                        )}
                        ></FormField>

                    <FormField
                        control={form.control}
                        name="unitario"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" dark:text-gray-200 text-lg">Preço Unitário</FormLabel>
                                <Input
                                className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                                    type="number"
                                    placeholder="Digite o preço unitário"
                                    {...field}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value);
                                        field.onChange(value);
                                        
                                        const quantidade = form.getValues("quantidade");
                                        if (quantidade) {
                                            form.setValue("total", value * quantidade, { shouldValidate: true });
                                        }
                                    }}
                                    />
                                {errors.unitario?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.unitario.message}</FormMessage>}
                            </FormItem>
                        )}
                        ></FormField>

                    <FormField
                        control={form.control}
                        name="quantidade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantidade</FormLabel>
                                <Input
                                className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                                    type="number"
                                    placeholder="Digite a quantidade"
                                    {...field}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        field.onChange(value);
                                        
                                        const unitario = form.getValues("unitario");
                                        if (unitario) {
                                            form.setValue("total", value * unitario, { shouldValidate: true });
                                        }
                                    }}
                                    />
                                {errors.quantidade?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.quantidade.message}</FormMessage>}
                            </FormItem>
                        )}
                        ></FormField>

                    <FormField
                        control={form.control}
                        name="total"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" dark:text-gray-200 text-lg">Total</FormLabel>
                                <Input
                                className="w-2/4 h-11 px-3 py-2 border-zinc-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:text-white"
                                    type="number"
                                    placeholder="Total"
                                    disabled
                                    {...field}
                                    />
                                {errors.total?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.total.message}</FormMessage>}
                            </FormItem>
                        )}
                        ></FormField>

                    <FormField
                        control={form.control}
                        name="dataCompra"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data da Compra</FormLabel>
                                <DatePickerDemo 
                                    date={field.value} 
                                    setDate={(date) => {
                                        field.onChange(date);
                                    }}
                                    />
                                {errors.dataCompra?.message && <FormMessage className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.dataCompra.message}</FormMessage>}
                            </FormItem>
                        )}
                        />

                    <BotaoSalvarCadastro href="listagemPedidos" />
                        </div>
                        </div>
                </form>
            </Form>
        </>
    )
}
