import { z } from "zod";

export const itemSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome do item."),
});

export type ItemFormData = z.infer<typeof itemSchema>;
