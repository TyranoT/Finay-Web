"use client";

import { useCallback, useState } from "react";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { perguntarAssistente } from "../api/assistente.api";
import type { Mensagem } from "../types";

function gerarId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

interface ChatState {
  mensagens: Mensagem[];
  isPensando: boolean;
  enviar: (pergunta: string) => Promise<void>;
}

/**
 * Estado do chat com o assistente: envia perguntas, mantém histórico
 * local e gerencia o estado "pensando" enquanto aguarda resposta.
 */
export function useChatIA(): ChatState {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [isPensando, setIsPensando] = useState(false);

  const enviar = useCallback(
    async (pergunta: string) => {
      const limpa = pergunta.trim();
      if (!limpa || isPensando) return;

      const userMsg: Mensagem = { id: gerarId(), autor: "user", texto: limpa };
      setMensagens((prev) => [...prev, userMsg]);
      setIsPensando(true);

      const resposta = await perguntarAssistente(token, limpa, escopo.uid);
      const aiMsg: Mensagem = { id: gerarId(), autor: "ai", texto: resposta };

      setMensagens((prev) => [...prev, aiMsg]);
      setIsPensando(false);
    },
    [token, escopo.uid, isPensando],
  );

  return { mensagens, isPensando, enviar };
}
