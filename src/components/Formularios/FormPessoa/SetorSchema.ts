import { z } from "zod";

export const schemaSetor = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, { message: "Nome do setor é obrigatório" }),
})

export type schemaSetor = z.infer<typeof schemaSetor>