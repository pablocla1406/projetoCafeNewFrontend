import { z } from "zod";

export const PedidoSchema = z.object({
    id: z.string(),
    cliente: z.string(),
    bebida: z.string(),
    unitario: z.union([z.string(), z.number()]).transform(val => Number(val)),
    quantidade: z.union([z.string(), z.number()]).transform(val => Number(val)),
    total: z.union([z.string(), z.number()]).transform(val => Number(val)),
    data_compra: z.union([z.string(), z.date()]).transform(val => 
        typeof val === 'string' ? new Date(val) : val
    ),
});

export type PedidoSchema = z.infer<typeof PedidoSchema>;
