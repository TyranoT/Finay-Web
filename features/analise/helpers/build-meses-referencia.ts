
type ReturnBuild = {
    ano: number;
    mes: number;
}

/**
 * Constrói um array de objetos com os anos e meses de referência.
 * 
 * @param qtd - Quantidade de meses a serem construídos.
 * @returns Array de objetos com os anos e meses de referência.
 * 
 * Exemplo:
 * ```ts
 * buildMesesReferencia(6) 
 * 
 * [
 *  { ano: 2026, mes: 5 },
 *  { ano: 2026, mes: 4 },
 *  { ano: 2026, mes: 3 },
 *  { ano: 2026, mes: 2 },
 *  { ano: 2026, mes: 1 },
 *  { ano: 2025, mes: 12 }
 * ]
 * ```
 */
export function buildMesesReferencia(qtd: number): ReturnBuild[] {
    const ref = new Date();
    const lista: Array<{ ano: number; mes: number }> = [];

    for (let i = qtd - 1; i >= 0; i--) {
        const d = new Date(ref.getFullYear(), ref.getMonth() - i, 1);
        lista.push({ ano: d.getFullYear(), mes: d.getMonth() });
    }

    return lista;
}