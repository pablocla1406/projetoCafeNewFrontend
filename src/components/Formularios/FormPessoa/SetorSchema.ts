import { z } from "zod";

export const setorSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, { message: "Nome do setor é obrigatório" }),
})

export type setorSchema = z.infer<typeof setorSchema>