import { z } from "zod";

const pessoaSchemaDoPedido = z.object({
    id: z.string(),
    nome: z.string().min(1, "Nome do cliente é obrigatório"),
});

const bebidaSchemaDoPedido = z.object({
    id: z.string(),
    nome: z.string().min(1, "Nome da bebida é obrigatório"),
});


export const PedidoSchema = z.object({
    id: z.string(),
    cliente: pessoaSchemaDoPedido,
    bebida: bebidaSchemaDoPedido,
    unitario: z.number().min(1, "Preço unitário é obrigatório"),
    quantidade: z.number().min(1, "Quantidade é obrigatória"),
    total: z.number().min(1, "Total é obrigatório"),
    data_compra: z.date().refine((date) => {
        if (!date) return false;
        return true;
    }, "Data de compra é obrigatória"),
});

export type PedidoSchema = z.infer<typeof PedidoSchema>;
