import { z } from "zod";
import { StatusEnum } from "../FormBebidas/BebidaSchema";

const setorSchema = z.object({
  id: z.string(),
  nome: z.string(),
});

const permissaoEnum = z.enum(["ADMIN", "USER", "AUX"]) as z.ZodEnum<["ADMIN", "USER", "AUX"]>;

export const pessoaFormSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
        .max(25, { message: "O nome deve ter no máximo 25 caracteres" }),
    imagem: z.union([
        z.string().nullable(),
        z.instanceof(File),
    ]).optional(),
    usuario: z.string()
        .min(3, { message: "O usuário deve ter pelo menos 3 caracteres" })
        .max(16, { message: "O usuário deve ter no máximo 16 caracteres" }),
    senha: z.string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
        .max(16, { message: "A senha deve ter no máximo 16 caracteres" }),
    setor: setorSchema,
    permissao: permissaoEnum,
    status: StatusEnum
});

export type PessoaFormSchema = z.infer<typeof pessoaFormSchema>;