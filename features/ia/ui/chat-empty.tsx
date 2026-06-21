interface ChatEmptyProps {
  onSugestao: (texto: string) => void;
}

const SUGESTOES = [
  "Quanto gastei com alimentação este mês?",
  "Quais foram minhas maiores saídas?",
  "Como divido a fatura do cartão com o grupo?",
  "Resumo financeiro deste mês",
];

/**
 * Empty state do chat: explica o que o assistente faz e oferece
 * chips de sugestão que disparam perguntas pré-formuladas.
 */
export function ChatEmpty({ onSugestao }: ChatEmptyProps) {
  return (
    <div className="fx-chat-empty">
      <div className="titulo">Pergunte ao Finay</div>
      <div className="sub">
        Use linguagem natural — o assistente entende dados das suas contas,
        categorias e lançamentos.
      </div>
      <div className="fx-chat-chips">
        {SUGESTOES.map((s) => (
          <button
            type="button"
            key={s}
            className="fx-chat-chip"
            onClick={() => onSugestao(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
