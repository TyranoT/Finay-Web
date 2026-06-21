"use client";

import { useEffect, useRef, useState } from "react";
import { useTopbar } from "@/shared/hook/useTopbar";
import { useChatIA } from "../hooks/use-chat-ia";
import { ChatEmpty } from "../ui/chat-empty";
import { ChatMensagens } from "../ui/chat-mensagens";

function IconSpark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconEnviar() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/**
 * Página do Assistente IA — chat conversacional com o Finay.
 *
 * O chat ocupa toda a altura útil; mensagens fluem em coluna,
 * sugestões aparecem no empty-state.
 */
export function IAPage() {
  const { mensagens, isPensando, enviar } = useChatIA();
  const [rascunho, setRascunho] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useTopbar({
    titulo: "Assistente IA",
    subtitulo: "Pergunte sobre seus números em linguagem natural",
  });

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [mensagens, isPensando]);

  function handleEnviar() {
    if (!rascunho.trim() || isPensando) return;
    const texto = rascunho;
    setRascunho("");
    void enviar(texto);
  }

  function handleSugestao(texto: string) {
    void enviar(texto);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  }

  const vazio = mensagens.length === 0 && !isPensando;

  return (
    <div className="fx-content">
      <div className="fx-chat">
        <div className="fx-chat-head">
          <div className="spark">
            <IconSpark />
          </div>
          <div>
            <div className="titulo">Finay AI</div>
            <div className="sub">Conectado às suas contas e lançamentos</div>
          </div>
        </div>

        <div className="fx-chat-body" ref={bodyRef}>
          {vazio ? (
            <ChatEmpty onSugestao={handleSugestao} />
          ) : (
            <ChatMensagens mensagens={mensagens} isPensando={isPensando} />
          )}
        </div>

        <div className="fx-chat-foot">
          <input
            type="text"
            className="fx-chat-input"
            placeholder="Pergunte algo ao Finay…"
            value={rascunho}
            onChange={(e) => setRascunho(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isPensando}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEnviar}
            disabled={isPensando || !rascunho.trim()}
            style={{ minWidth: 110 }}
          >
            <IconEnviar />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
