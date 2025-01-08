import { z } from "zod";

const pessoaSchemaDoPedido = z.object({
    id: z.string(),
    nome: z.string(),
    imagem: z.string().url().optional(),
    usuario: z.string(),
    senha: z.string(),
    setor: z.object({
        id: z.string().or(z.number()).transform(val => String(val)),
        nome: z.string(),
    }),
    permissao: z.enum(["ADMIN", "USER", "AUX"]) as z.ZodEnum<["ADMIN", "USER", "AUX"]>,
});

const bebidaSchemaDoPedido = z.object({
    id: z.string(),
    nome: z.string(),
    preco: z.number(),
    descricao: z.string(),
    image: z.union([z.instanceof(File), z.string()]).optional(),
    status: z.enum(["Ativo", "Inativado"]) as z.ZodEnum<["Ativo", "Inativado"]>,
});


export const PedidoSchema = z.object({
    id: z.string(),
    cliente: pessoaSchemaDoPedido,
    bebida: bebidaSchemaDoPedido,
    unitario: z.number(),
    quantidade: z.number(),
    total: z.number(),
    data_compra: z.date(),
});

export type PedidoSchema = z.infer<typeof PedidoSchema>;
