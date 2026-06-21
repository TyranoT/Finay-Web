"use client";

import { useQuery } from "@tanstack/react-query";
import { useTopbar } from "@/shared/hook/useTopbar";
import { useSession } from "@/shared/hook/useSession";
import { fetchAprovacoes } from "@/shared/api/aprovacoes.api";
import { AprovacaoCard, buildDescricaoPorTipo } from "../ui/aprovacao-card";

function tempoDecorrido(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  const dias = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (dias <= 0) return "hoje";
  if (dias === 1) return "ontem";
  if (dias < 7) return `há ${dias} dias`;
  return `há ${Math.floor(dias / 7)} semanas`;
}

function ZeroState() {
  return (
    <div className="fx-zero-state">
      <div className="ico">✨</div>
      <h2>Tudo em dia</h2>
      <p>
        Você está livre de decisões pendentes. Quando alguém te convidar pra
        um grupo, propuser uma permissão ou pedir co-propriedade de um ativo,
        a solicitação aparece aqui.
      </p>
    </div>
  );
}

/**
 * Página Aprovações — lista de pendências com aceitar/recusar; zero-state
 * convidativo quando não há nada para decidir.
 */
export function AprovacoesPage() {
  const { token } = useSession();
  const { data = [], isLoading } = useQuery({
    queryKey: ["aprovacoes"],
    queryFn: () => fetchAprovacoes(token),
    enabled: !!token,
    refetchInterval: 60_000,
  });

  const pendentes = data.filter((a) => a.status === "pendente");

  useTopbar({
    titulo: "Aprovações",
    subtitulo: isLoading
      ? "Carregando…"
      : pendentes.length === 0
        ? "Nada pendente"
        : `${pendentes.length} ${pendentes.length === 1 ? "decisão pendente" : "decisões pendentes"}`,
  });

  return (
    <div className="fx-content col gap-4">
      {!isLoading && pendentes.length === 0 ? (
        <ZeroState />
      ) : (
        pendentes.map((aprov) => {
          const meta = buildDescricaoPorTipo(aprov.tipo);
          return (
            <AprovacaoCard
              key={aprov.uid}
              uid={aprov.uid}
              titulo={meta.titulo}
              icone={meta.icone}
              descricao={aprov.tipo ?? "Aguardando sua decisão"}
              tempo={tempoDecorrido(aprov.criada_em)}
            />
          );
        })
      )}
    </div>
  );
}
