"use client";

import type { ReactNode } from "react";
import { Label } from "@/shared/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

/**
 * Label + slot + mensagem de erro padronizados para os forms de Cadastros.
 *
 * Mantém o visual eyebrow + input + erro sem repetir boilerplate em cada form.
 */
export function FormField({
  id,
  label,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="col" style={{ gap: 6, marginBottom: 16 }}>
      <Label htmlFor={id}>
        <span className="t-xs" style={{ color: "var(--ink-3)" }}>
          {label}
        </span>
      </Label>
      {children}
      {hint && !error && (
        <span className="t-xs" style={{ color: "var(--ink-4)" }}>
          {hint}
        </span>
      )}
      {error && (
        <span className="t-xs" style={{ color: "var(--coral)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
