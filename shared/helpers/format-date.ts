const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const MONTH_SHORT = [
  "jan.", "fev.", "mar.", "abr.", "mai.", "jun.",
  "jul.", "ago.", "set.", "out.", "nov.", "dez.",
];

/**
 * Formata uma data ISO (YYYY-MM-DD) para exibição curta.
 *
 * @param dateStr - Data no formato "YYYY-MM-DD"
 * @returns String no formato "15 jun."
 */
export function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTH_SHORT[month - 1]}`;
}

/**
 * Formata um objeto Date para nome completo do mês e ano.
 *
 * @param date - Objeto Date a formatar
 * @returns String no formato "Junho 2026"
 */
export function formatMonthYear(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Retorna a data atual no formato YYYY-MM-DD.
 *
 * @param date - Objeto Date (padrão: hoje)
 * @returns String no formato "2026-06-15"
 */
export function toISODate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Retorna o primeiro e último dia do mês de uma data como strings ISO.
 *
 * @param date - Referência de mês
 * @returns Objeto com `inicio` e `fim` no formato YYYY-MM-DD
 */
export function getMonthRange(date: Date): { inicio: string; fim: string } {
  const inicio = new Date(date.getFullYear(), date.getMonth(), 1);
  const fim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { inicio: toISODate(inicio), fim: toISODate(fim) };
}
