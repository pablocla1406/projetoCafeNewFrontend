import IPessoa from "@/utils/interfaces/IPessoa";
import hookPedidoForm from "./hookPedidoForm";
import { PedidoSchema } from "./PedidoSchema";
import IBebida from "@/utils/interfaces/IBebida";
import { useEffect, useState } from "react";
import { pessoaService } from "@/service/PessoaService";
import { bebidaService } from "@/service/BebidaService";
import { Form, FormField, FormItem } from "@/components/ui/form";



type PedidoFormProps = {
    dados?: PedidoSchema,
}

export default function PedidoForm({dados}: PedidoFormProps){
    const { form, handleSubmit, errors, onSubmit } = hookPedidoForm(dados);
    const [clientes, setClientes] = useState<IPessoa[]>([]);
    const [bebidas, setBebidas] = useState<IBebida[]>([]);

    useEffect(() => {
        async function fetchData() {
            const clientesData = await pessoaService.listarDados();
            const bebidasData = await bebidaService.listarDados();
            setClientes(clientesData);
            setBebidas(bebidasData);
        }
        fetchData();
    }, []);

    return(
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="cliente"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cliente</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value.id}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o Cliente"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Clientes</SelectLabel>
                                        {clientes.map(cliente => (
                                            <SelectItem key={cliente.id} value={cliente.id}>{cliente.nome}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.cliente?.message && <FormMessage>{errors.cliente.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="bebida"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bebida</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value.id}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione a Bebida"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Bebidas</SelectLabel>
                                        {bebidas.map(bebida => (
                                            <SelectItem key={bebida.id} value={bebida.id}>{bebida.nome}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.bebida?.message && <FormMessage>{errors.bebida.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="unitario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço Unitário</FormLabel>
                            <Input {...field} type="number" placeholder="Digite o Preço Unitário" />
                            {errors.unitario?.message && <FormMessage>{errors.unitario.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                        <FormItem></FormItem>
                            <FormLabel>Quantidade</FormLabel>
                            <Input {...field} type="number" placeholder="Digite a Quantidade" />
                            {errors.quantidade?.message && <FormMessage>{errors.quantidade.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total</FormLabel>
                            <Input {...field} type="number" placeholder="Digite o Total" />
                            {errors.total?.message && <FormMessage>{errors.total.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <FormField
                    control={form.control}
                    name="dataCompra"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data da Compra</FormLabel>
                            <Input {...field} type="date" />
                            {errors.dataCompra?.message && <FormMessage>{errors.dataCompra.message}</FormMessage>}
                        </FormItem>
                    )}
                ></FormField>

                <Button type="submit">Salvar</Button>
            </form>
        </Form>
    )
}
