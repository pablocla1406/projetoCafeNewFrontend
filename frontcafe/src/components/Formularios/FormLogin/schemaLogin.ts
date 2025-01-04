import { z } from "zod";

export const loginSchema = z.object({
    usuario: z.string().min(1, { message: "O campo usuario é obrigatório" }),
    senha: z.string().min(1, { message: "O campo senha é obrigatório" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
