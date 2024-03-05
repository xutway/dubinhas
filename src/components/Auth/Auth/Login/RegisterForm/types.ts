import { z } from "zod";

export const registerFormSchema = z.object({
  username: z.string({ required_error: "Nome de usuário obrigatório" }).min(3),
  email: z.string({ required_error: "Email obrigatório" }).email({
    message: "Email inválido",
  }),
  passwordConfirmation: z.string({
    required_error: "Confirmação de senha obrigatória",
    invalid_type_error: "Senha não confere",
  }),
  password: z
    .string({ required_error: "Senha obrigatória" })
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export type registerFormData = z.infer<typeof registerFormSchema>;
