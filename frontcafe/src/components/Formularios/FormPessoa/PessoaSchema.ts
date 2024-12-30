import { z } from "zod";

const setorSchema = z.object({
  id: z.string().or(z.number()).transform(val => String(val)),
  nome: z.string().min(1, { message: "Nome do Setor é obrigatório" }),
});

const permissaoEnum = z.enum(["ADMIN", "USER", "AUX"]) as z.ZodEnum<["ADMIN", "USER", "AUX"]>;

export const pessoaFormSchema = z.object({
    id: z.string(),
    nome: z.string().min(4, { message: "O mínimo de caracteres é 3" }),
  foto: z.string().url().optional(),
  usuario: z.string().min(3, { message: "O campo Usuário é obrigatório" }),
  senha: z.string().min(3, { message: "O campo Senha é obrigatório" }),
  setor: setorSchema,
  permissao: permissaoEnum,
});

export type PessoaFormSchema = z.infer<typeof pessoaFormSchema>