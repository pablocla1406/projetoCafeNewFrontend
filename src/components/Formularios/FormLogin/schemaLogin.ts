import { z } from "zod";

export const loginSchema = z.object({
    usuario: z.string().min(1, { message: "Digite seu usuário" }),
    senha: z.string().min(1, { message: "Digite sua senha" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
