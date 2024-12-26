import { z } from "zod";

const funcaoSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, { message: "Nome da função é obrigatório" }),
});

const permissaoEnum = z.enum(["ADMIN", "USER", "AUX"]);

export const pessoaFormSchema = z.object({
    id: z.string(),
    nome: z.string().min(4, { message: "O mínimo de caracteres é 3" }),
  foto: z.string().url().optional(),
  usuario: z.string().min(3, { message: "O campo Usuário é obrigatório" }),
  senha: z.string().min(3, { message: "O campo Senha é obrigatório" }),
  funcao: funcaoSchema,
  permissao: permissaoEnum,
});

export type PessoaFormSchema = z.infer<typeof pessoaFormSchema>