"use client";

import { useMemo } from "react";
import { useTopbar } from "@/shared/hook/useTopbar";
import { useConquistas } from "../api/use-conquistas";
import { ConquistaCard } from "../ui/conquista-card";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

function SkeletonCard() {
  return (
    <div className="fx-conq-card" aria-hidden="true">
      <div
        className="fx-conq-medal"
        style={{ background: "var(--line-2)" }}
      />
      <div
        style={{
          height: 14,
          width: 140,
          background: "var(--line-2)",
          borderRadius: 5,
          marginBottom: 6,
        }}
      />
      <div
        style={{
          height: 11,
          width: 180,
          background: "var(--line-2)",
          borderRadius: 5,
        }}
      />
    </div>
  );
}

/**
 * Página Conquistas — grid de medalhas com tratamento por raridade.
 * Desbloqueadas em destaque, bloqueadas com opacidade reduzida.
 */
export function ConquistasPage() {
  const { data: conquistas = [], isLoading } = useConquistas();

  const { desbloqueadas, totalUnicas, totalDesbloqueadas } = useMemo(() => {
    const desbloq = conquistas.filter((c) => c.desbloqueada);
    return {
      desbloqueadas: desbloq,
      totalUnicas: conquistas.length,
      totalDesbloqueadas: desbloq.length,
    };
  }, [conquistas]);

  useTopbar({
    titulo: "Conquistas",
    subtitulo: isLoading
      ? "Carregando…"
      : totalUnicas === 0
        ? "Nenhuma conquista cadastrada"
        : `${totalDesbloqueadas} de ${totalUnicas} desbloqueadas`,
  });

  return (
    <div className="fx-content col gap-6">
      {desbloqueadas.length > 0 && (
        <section className="col gap-3">
          <SectionEyebrow
            label="Desbloqueadas"
            hint={`${desbloqueadas.length} ${desbloqueadas.length === 1 ? "medalha" : "medalhas"}`}
          />
          <div className="fx-conq-grid">
            {desbloqueadas.map((c) => (
              <ConquistaCard key={c.uid} conquista={c} />
            ))}
          </div>
        </section>
      )}

      <section className="col gap-3">
        <SectionEyebrow
          label={desbloqueadas.length > 0 ? "Próximas" : "Todas"}
          hint={
            isLoading
              ? "Carregando"
              : conquistas.length === 0
                ? "Sem itens"
                : `${conquistas.length - desbloqueadas.length} a desbloquear`
          }
        />
        {isLoading ? (
          <div className="fx-conq-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : conquistas.length === 0 ? (
          <div className="fx-zero-state">
            <div className="ico">🏆</div>
            <h2>Sem conquistas por enquanto</h2>
            <p>
              Continue registrando seus lançamentos e organizando suas
              finanças — medalhas aparecem aqui conforme você avança.
            </p>
          </div>
        ) : (
          <div className="fx-conq-grid">
            {conquistas.map((c) => (
              <ConquistaCard key={c.uid} conquista={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
