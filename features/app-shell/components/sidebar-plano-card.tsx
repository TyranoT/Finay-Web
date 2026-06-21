"use client";

import { useSession } from "@/shared/hook/useSession";

const QUOTA_LIMITE_PADRAO = 200;

/**
 * Card no rodapé do sidebar com nome do plano e quota de IA utilizada.
 *
 * Como a API de cota ainda não está plugada no front, exibimos `0/limite`
 * por enquanto. O slot está pronto para receber o valor real.
 */
export function SidebarPlanoCard() {
  const { session } = useSession();
  const usos = 0;
  const limite = QUOTA_LIMITE_PADRAO;
  const pct = Math.min(100, (usos / limite) * 100);
  const nomePlano = session?.grupo_uid ? "Plano Família" : "Plano Pessoal";

  return (
    <div className="fx-plano">
      <div
        className="row"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <span className="ttl">{nomePlano}</span>
        <span className="quota">
          IA: {usos}/{limite}
        </span>
      </div>
      <div className="progress">
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
