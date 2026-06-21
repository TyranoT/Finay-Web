import { z } from "zod";

const emailOpcional = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    "E-mail inválido.",
  );

export const pessoaSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome da pessoa."),
  email: emailOpcional,
  cpf_cnpj: z.string().trim().optional(),
});

export type PessoaFormData = z.infer<typeof pessoaSchema>;
