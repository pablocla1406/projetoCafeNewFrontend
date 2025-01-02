import { z } from "zod";
import { pessoaFormSchema } from "../FormPessoa/PessoaSchema";
import { BebidaSchema } from "../FormBebidas/BebidaSchema";

export const PedidoSchema = z.object({
    id: z.string(),
    cliente: pessoaFormSchema,
    bebida: BebidaSchema,
    unitario: z.number().min(1, { message: "Preço unitário é obrigatório" }),
    quantidade: z.number().min(1, { message: "Quantidade é obrigatória" }),
    total: z.number().min(1, { message: "Total é obrigatório" }),
    dataCompra: z.date(),
});

export type PedidoSchema = z.infer<typeof PedidoSchema>;
