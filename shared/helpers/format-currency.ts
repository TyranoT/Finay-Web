/**
 * Formata um número como moeda com símbolo customizável.
 *
 * @param value - Valor numérico a formatar
 * @param simbolo - Símbolo monetário (padrão "R$")
 * @returns String no formato "R$ 1.234,56"
 *
 * @example
 * formatCurrency(0)       // "R$ 0,00"
 * formatCurrency(1990.5)  // "R$ 1.990,50"
 * formatCurrency(-500)    // "R$ -500,00"
 */
export function formatCurrency(value: number, simbolo = "R$"): string {
  return `${simbolo} ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
