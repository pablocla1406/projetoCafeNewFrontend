import { z } from "zod";

const setorSchema = z.object({
  id: z.string(),
  nome: z.string(),
});

const permissaoEnum = z.enum(["ADMIN", "USER", "AUX"]) as z.ZodEnum<["ADMIN", "USER", "AUX"]>;

export const pessoaFormSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
        .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),
    imagem: z.union([
        z.string().nullable(),
        z.instanceof(File),
    ]).optional(),
    usuario: z.string()
        .min(3, { message: "O usuário deve ter pelo menos 3 caracteres" })
        .max(50, { message: "O usuário deve ter no máximo 50 caracteres" }),
    senha: z.string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
        .max(50, { message: "A senha deve ter no máximo 50 caracteres" }),
    setor: setorSchema,
    permissao: permissaoEnum,
});

export type PessoaFormSchema = z.infer<typeof pessoaFormSchema>;