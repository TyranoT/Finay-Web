"use client";

import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";

function IconPerson() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function IconGroup() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.2a3 3 0 0 1 0 5.6M21 19a5.5 5.5 0 0 0-4-5.3" />
    </svg>
  );
}

/**
 * Segmented control para alternar entre escopo "Pessoal" e cada grupo do usuário.
 */
export function GrupoSelector() {
  const { escopo, grupos, setEscopo } = useGrupoAtivo();

  return (
    <div className="fx-grupo-seg">
      <button
        type="button"
        className={escopo.uid === null ? "active" : ""}
        onClick={() => setEscopo(null)}
      >
        <IconPerson />
        Pessoal
      </button>
      {grupos.map((grupo) => (
        <button
          key={grupo.uid}
          type="button"
          className={escopo.uid === grupo.uid ? "active" : ""}
          onClick={() => setEscopo(grupo.uid)}
        >
          <IconGroup />
          {grupo.nome}
        </button>
      ))}
    </div>
  );
}
