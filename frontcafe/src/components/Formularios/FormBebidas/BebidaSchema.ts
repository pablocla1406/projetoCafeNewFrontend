import { z } from "zod";

export const StatusEnum = z.enum(["Ativo", "Inativado"]);

export const BebidaSchema = z.object({
    id: z.string(),
    nome: z.string().min(1, { message: "Nome da bebida é obrigatório" }),
    descricao: z.string().min(1, { message: "Descrição da bebida é obrigatório" }),
    preco: z.number().min(0, { message: "O preço não pode ser negativo" }),
    imagem: z.union([
        z.string().nullable(),
        z.instanceof(File),
    ]).optional(),
    status: StatusEnum,
});

export type BebidaSchema = z.infer<typeof BebidaSchema>;
