import { z } from "zod";

export const studentSchema = z.object({
  name: z.string({ required_error: "Nome de usuário obrigatório" }).min(3),
  phone: z
    .string({ required_error: "Telefone obrigatório" })
    .min(8, { message: "Telefone inválido" })
    .max(32, { message: "Telefone inválido" }),
  avatarPath: z.any({
    required_error: "Avatar obrigatório",
  }),
});

export type studentFormDta = z.infer<typeof studentSchema>;
