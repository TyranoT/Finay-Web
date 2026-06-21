import { z } from "zod";

export const lugarSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome do lugar."),
  cidade: z.string().trim().optional(),
  estado: z
    .string()
    .trim()
    .max(2, "Use a sigla de 2 letras (ex.: SP).")
    .optional(),
});

export type LugarFormData = z.infer<typeof lugarSchema>;
