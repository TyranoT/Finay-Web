"use client";

import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

interface EyebrowCtaProps {
  label: string;
  hint?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

function IconPlus() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/**
 * SectionEyebrow + botão de ação no canto direito. Usado nas seções de
 * Cadastros para disparar o drawer de criação.
 */
export function EyebrowCta({ label, hint, ctaLabel, onCta }: EyebrowCtaProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <SectionEyebrow label={label} hint={hint} />
      {onCta && (
        <button type="button" className="fx-eyebrow-cta" onClick={onCta}>
          <IconPlus />
          {ctaLabel ?? "Adicionar"}
        </button>
      )}
    </div>
  );
}
