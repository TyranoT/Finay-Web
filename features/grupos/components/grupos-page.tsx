"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useSaldo } from "@/features/dashboard/api/use-saldo";
import { useSaidasMes } from "@/features/dashboard/api/use-saidas-mes";
import { useTotaisMes } from "@/features/dashboard/hooks/use-totais-mes";
import { useMembrosGrupo } from "../api/use-membros-grupo";
import { GrupoHero } from "../ui/grupo-hero";
import { MembrosLista } from "../ui/membros-lista";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

function ZeroState() {
  return (
    <div className="fx-zero-state">
      <div className="ico">👥</div>
      <h2>Você está no modo Pessoal</h2>
      <p>
        Crie um grupo (família, casa compartilhada, time) para consolidar
        finanças com outras pessoas. Use o seletor no topo para alternar
        entre escopos.
      </p>
    </div>
  );
}

/**
 * Página Grupos — hero do grupo ativo + lista de membros com permissões.
 */
export function GruposPage() {
  const { escopo, grupos } = useGrupoAtivo();
  const { data: membros = [], isLoading: loadMembros } = useMembrosGrupo(
    escopo.uid,
  );
  const { data: saldos = [] } = useSaldo();
  const { data: saidasMes = [] } = useSaidasMes();
  const totais = useTotaisMes(saidasMes);

  useTopbar({
    titulo: "Grupos",
    subtitulo:
      escopo.nome === "Pessoal"
        ? "Você está no escopo pessoal"
        : `Visualizando ${escopo.nome}`,
  });

  if (!escopo.uid) {
    return (
      <div className="fx-content col gap-6">
        <ZeroState />
        {grupos.length > 0 && (
          <section className="col gap-3">
            <SectionEyebrow
              label="Outros grupos"
              hint={`${grupos.length} disponíveis`}
            />
            <div
              className="card card-pad"
              style={{ borderRadius: 18, padding: "12px 18px" }}
            >
              {grupos.map((g) => (
                <div
                  key={g.uid}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {g.nome}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const saldoTotal = saldos?.[0]?.total ?? 0;

  return (
    <div className="fx-content col gap-6">
      <GrupoHero
        nome={escopo.nome}
        quantidadeMembros={membros.length}
        gastoCompartilhado={totais.saidas}
        saldoCompartilhado={saldoTotal}
      />

      <section className="col gap-3">
        <SectionEyebrow
          label="Membros"
          hint={`${membros.length} ${membros.length === 1 ? "pessoa" : "pessoas"} neste grupo`}
        />
        <MembrosLista membros={membros} isLoading={loadMembros} />
      </section>
    </div>
  );
}
