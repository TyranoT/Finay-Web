import { z } from "zod";

const numeroObrigatorio = z
  .string()
  .trim()
  .min(1, "Informe o valor.")
  .refine((value) => Number.isFinite(Number(value.replace(",", "."))), {
    message: "Informe um valor valido.",
  });

const numeroOpcional = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || Number.isFinite(Number(value.replace(",", "."))), {
    message: "Informe um valor valido.",
  });

const diaOpcional = z
  .string()
  .trim()
  .optional()
  .refine((value) => {
    if (!value) return true;
    const dia = Number(value);
    return Number.isInteger(dia) && dia >= 1 && dia <= 31;
  }, "Informe um dia entre 1 e 31.");

export const contaSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome da conta."),
  tipo: z.enum(["corrente", "poupanca", "carteira", "cartao"]),
  saldo_inicial: numeroObrigatorio,
  limite: numeroOpcional,
  dia_vencimento: diaOpcional,
  dia_fechamento: diaOpcional,
});

export type ContaFormData = z.infer<typeof contaSchema>;
