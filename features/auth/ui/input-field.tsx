import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import type { ComponentProps, ReactNode } from "react";
import { LoginIcon } from "./login-icon";

interface InputFieldProps {
  id: string;
  label: string;
  iconName: string;
  trailing?: ReactNode;
  inputProps?: ComponentProps<typeof Input>;
}

/**
 * Campo de formulário com label, ícone à esquerda e slot opcional à direita.
 *
 * @param trailing - Elemento opcional (ex: botão "Mostrar/Ocultar") renderizado à direita
 */
export function InputField({ id, label, iconName, trailing, inputProps }: InputFieldProps) {
  return (
    <div className="col gap-2">
      <Label
        htmlFor={id}
        className="t-xs"
        style={{ color: "var(--ink-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        {label}
      </Label>
      <div className="relative">
        <LoginIcon
          name={iconName}
          size={18}
          stroke="var(--ink-4)"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <Input
          id={id}
          className="pl-10 h-12 rounded-[14px] text-[15px] font-medium"
          style={{ borderColor: "var(--line-2)" }}
          {...inputProps}
        />
        {trailing}
      </div>
    </div>
  );
}
