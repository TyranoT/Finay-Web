"use client";

interface CadastroFormFooterProps {
  isPending: boolean;
  isEdicao: boolean;
  onClose: () => void;
}

/** Rodapé padrão dos forms de Cadastros: Cancelar + Salvar. */
export function CadastroFormFooter({
  isPending,
  isEdicao,
  onClose,
}: CadastroFormFooterProps) {
  return (
    <div
      className="row gap-3"
      style={{
        padding: 22,
        borderTop: "1px solid var(--line)",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        className="btn btn-ghost btn-lg"
        onClick={onClose}
        disabled={isPending}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-lg grow"
        disabled={isPending}
      >
        {isPending ? "Salvando…" : isEdicao ? "Salvar alterações" : "Adicionar"}
      </button>
    </div>
  );
}
