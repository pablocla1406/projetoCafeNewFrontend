import { z } from "zod";

export const StatusEnum = z.enum(["Ativo", "Inativado"]);

export const BebidaSchema = z.object({
    id: z.string(),
    nome: z.string().min(1, { message: "Nome da bebida é obrigatório" }),
    descricao: z.string().min(1, { message: "Descrição da bebida é obrigatório" }),
    preco: z.number().min(1, { message: "Preço da bebida é obrigatório" }),
    image: z.string().url().optional(),
    status: StatusEnum,
});

export type BebidaSchema = z.infer<typeof BebidaSchema>;
