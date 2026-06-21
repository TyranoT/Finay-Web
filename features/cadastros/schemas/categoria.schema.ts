import { z } from "zod";

export const categoriaSchema = z
  .object({
    nome: z.string().trim().min(1, "Informe o nome da categoria."),
    opcao_entrada: z.boolean(),
    opcao_saida: z.boolean(),
  })
  .refine((data) => data.opcao_entrada || data.opcao_saida, {
    message: "Marque pelo menos um fluxo (entrada ou saída).",
    path: ["opcao_saida"],
  });

export type CategoriaFormData = z.infer<typeof categoriaSchema>;
