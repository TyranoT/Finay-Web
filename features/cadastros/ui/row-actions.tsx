"use client";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

function IconPencil() {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconTrash() {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

/** Par de botões editar/excluir que aparece no hover de linhas. */
export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <span className="fx-row-actions">
      {onEdit && (
        <button
          type="button"
          className="fx-row-action"
          onClick={onEdit}
          aria-label="Editar"
        >
          <IconPencil />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className="fx-row-action danger"
          onClick={onDelete}
          aria-label="Excluir"
        >
          <IconTrash />
        </button>
      )}
    </span>
  );
}
