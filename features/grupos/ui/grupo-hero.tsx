import { formatCurrency } from "@/shared/helpers/format-currency";

interface GrupoHeroProps {
  nome: string;
  quantidadeMembros: number;
  gastoCompartilhado: number;
  saldoCompartilhado: number;
}

/**
 * Card-destaque do grupo ativo: nome em display, métricas consolidadas
 * em Space Mono, gradiente escuro com indigo nas extremidades.
 */
export function GrupoHero({
  nome,
  quantidadeMembros,
  gastoCompartilhado,
  saldoCompartilhado,
}: GrupoHeroProps) {
  return (
    <div className="fx-grupo-hero">
      <div
        className="blob"
        style={{
          width: 280,
          height: 280,
          background: "rgba(91,95,239,0.32)",
          top: -120,
          right: -100,
        }}
      />
      <div
        className="blob"
        style={{
          width: 180,
          height: 180,
          background: "rgba(0,184,148,0.28)",
          bottom: -80,
          right: 160,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span className="label">Grupo ativo</span>
        <div className="nome">{nome}</div>
        <div className="meta">
          <div className="item">
            <div className="rot">Membros</div>
            <div className="val">{quantidadeMembros}</div>
          </div>
          <div className="item">
            <div className="rot">Saldo compartilhado</div>
            <div className="val">{formatCurrency(saldoCompartilhado)}</div>
          </div>
          <div className="item">
            <div className="rot">Gasto do mês</div>
            <div className="val">{formatCurrency(gastoCompartilhado)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
