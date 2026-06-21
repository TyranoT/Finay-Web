interface SectionEyebrowProps {
  label: string;
  hint?: string;
}

/**
 * Marcador de seção em sobrancelha (eyebrow).
 *
 * Usado para organizar a Visão geral em capítulos de tempo
 * (ESTE MÊS, À FRENTE, SUAS CONTAS). Encoda cronologia, não decora.
 */
export function SectionEyebrow({ label, hint }: SectionEyebrowProps) {
  return (
    <div className="fx-eyebrow-time">
      <span>{label}</span>
      {hint && (
        <>
          <span className="dot">·</span>
          <span className="hint">{hint}</span>
        </>
      )}
    </div>
  );
}
