import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string({ required_error: "Nome de usuário obrigatório" }).min(3),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export type loginFormData = z.infer<typeof loginFormSchema>;
