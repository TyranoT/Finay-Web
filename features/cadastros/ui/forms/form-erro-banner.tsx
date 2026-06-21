interface FormErroBannerProps {
  mensagem?: string;
}

/** Faixa de erro no rodapé do form, para erros vindos da API. */
export function FormErroBanner({ mensagem }: FormErroBannerProps) {
  if (!mensagem) return null;
  return (
    <div
      className="t-sm"
      style={{
        color: "var(--coral)",
        background: "var(--coral-50)",
        padding: "10px 14px",
        borderRadius: 10,
      }}
    >
      {mensagem}
    </div>
  );
}
