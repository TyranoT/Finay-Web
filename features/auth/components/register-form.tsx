"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { isApiResponseError } from "@/shared/http/fetcher";
import { BrandPanel, FeaturesCard } from "../ui/brand-panel";
import { InputField } from "../ui/input-field";
import { LoginIcon } from "../ui/login-icon";
import { useRegister } from "../api/use-register";
import { useLoginAnimation } from "../hooks/use-login-animation";

const BRAND_HEADING = (
  <>
    Comece sua
    <br />
    jornada financeira ✨
  </>
);

const BRAND_DESCRIPTION =
  "Organize suas finanças, gerencie grupos e tome decisões mais inteligentes com a IA do Finay.";

function ShowPasswordButton({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13.5px] font-bold"
      style={{
        color: "var(--indigo-600)",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font)",
      }}
    >
      {visible ? "Ocultar" : "Mostrar"}
    </button>
  );
}

function PasswordStrengthHint({ senha }: { senha: string }) {
  if (!senha) return null;

  const strong = senha.length >= 8;

  return (
    <p
      className="t-xs"
      style={{
        marginTop: 6,
        color: strong ? "var(--jade)" : "var(--ink-4)",
        fontWeight: 600,
      }}
    >
      {strong ? "✓ Senha forte" : "Mínimo de 8 caracteres"}
    </p>
  );
}

function SignInPrompt() {
  const router = useRouter();

  return (
    <p className="t-sm muted text-center mt-6">
      Já tem conta?{" "}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="font-extrabold"
        style={{
          color: "var(--indigo-600)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font)",
          fontSize: "inherit",
        }}
      >
        Entrar
      </button>
    </p>
  );
}

/** Tela de criação de conta do Finay com animações de entrada via anime.js. */
export function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { mutate: register, isPending } = useRegister();
  const { brandRef, formRef, formItemsRef } = useLoginAnimation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setPasswordMismatch(false);

    const form = e.currentTarget;
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const senhaValue = (form.elements.namedItem("senha") as HTMLInputElement).value;
    const confirmar = (form.elements.namedItem("confirmar") as HTMLInputElement).value;
    const telefone = (form.elements.namedItem("telefone") as HTMLInputElement).value.trim();

    if (senhaValue !== confirmar) {
      setPasswordMismatch(true);
      return;
    }

    register(
      {
        nome,
        email,
        senha: senhaValue,
        ...(telefone ? { numero_telefone: telefone } : {}),
      },
      {
        onSuccess: () => {
          router.push("/?registered=1");
        },
        onError: (error) => {
          if (isApiResponseError(error)) {
            const errors = error.body.errors;
            const msg =
              typeof errors === "object" && "default" in errors
                ? errors.default
                : error.body.msg;
            setErrorMessage(msg);
          } else {
            setErrorMessage("Erro inesperado. Tente novamente.");
          }
        },
      }
    );
  }

  return (
    <div className="finay-app warm" style={{ height: "100vh", overflow: "hidden" }}>
      <BrandPanel
        ref={brandRef}
        heading={BRAND_HEADING}
        description={BRAND_DESCRIPTION}
        footer={<FeaturesCard />}
      />

      <div
        ref={formRef}
        className="opacity-0"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 392 }}>
          <div ref={formItemsRef}>
            <div data-animate>
              <p className="t-eyebrow" style={{ color: "var(--indigo)" }}>
                Criar conta gratuita
              </p>
              <h1 className="t-h1" style={{ marginTop: 8 }}>
                Bem-vindo ao Finay 🎉
              </h1>
              <p className="t-body muted" style={{ marginTop: 8, marginBottom: 26 }}>
                Preencha seus dados e comece agora.
              </p>
            </div>

            <div className="col gap-4">
              <div data-animate>
                <InputField
                  id="nome"
                  label="Nome completo"
                  iconName="user"
                  inputProps={{
                    name: "nome",
                    type: "text",
                    required: true,
                    autoComplete: "name",
                    placeholder: "Seu nome",
                  }}
                />
              </div>

              <div data-animate>
                <InputField
                  id="email"
                  label="E-mail"
                  iconName="mail"
                  inputProps={{
                    name: "email",
                    type: "email",
                    required: true,
                    autoComplete: "email",
                    placeholder: "seu@email.com",
                  }}
                />
              </div>

              <div data-animate>
                <InputField
                  id="senha"
                  label="Senha"
                  iconName="lock"
                  trailing={
                    <ShowPasswordButton
                      visible={showPassword}
                      onToggle={() => setShowPassword((v) => !v)}
                    />
                  }
                  inputProps={{
                    name: "senha",
                    type: showPassword ? "text" : "password",
                    required: true,
                    minLength: 8,
                    autoComplete: "new-password",
                    value: senha,
                    onChange: (e) => setSenha(e.target.value),
                    className:
                      "pl-10 pr-20 h-12 rounded-[14px] text-[15px] font-bold tracking-[3px]",
                    style: { borderColor: "var(--line-2)" },
                  }}
                />
                <PasswordStrengthHint senha={senha} />
              </div>

              <div data-animate>
                <Label
                  htmlFor="confirmar"
                  className="t-xs"
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "var(--ink-3)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Confirmar senha
                </Label>
                <div className="relative">
                  <LoginIcon
                    name="lock"
                    size={18}
                    stroke={passwordMismatch ? "var(--coral)" : "var(--ink-4)"}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  />
                  <Input
                    id="confirmar"
                    name="confirmar"
                    type={showConfirm ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Repita a senha"
                    onChange={() => setPasswordMismatch(false)}
                    className="pl-10 pr-20 h-12 rounded-[14px] text-[15px] font-bold tracking-[3px]"
                    style={{
                      borderColor: passwordMismatch ? "var(--coral)" : "var(--line-2)",
                    }}
                  />
                  <ShowPasswordButton
                    visible={showConfirm}
                    onToggle={() => setShowConfirm((v) => !v)}
                  />
                </div>
                {passwordMismatch && (
                  <p className="t-xs" style={{ marginTop: 6, color: "var(--coral)", fontWeight: 600 }}>
                    As senhas não coincidem
                  </p>
                )}
              </div>

              <div data-animate>
                <InputField
                  id="telefone"
                  label="Telefone (opcional)"
                  iconName="phone"
                  inputProps={{
                    name: "telefone",
                    type: "tel",
                    autoComplete: "tel",
                    placeholder: "(11) 99999-9999",
                  }}
                />
              </div>
            </div>

            {errorMessage && (
              <div
                data-animate
                className="t-sm"
                style={{
                  color: "var(--coral)",
                  background: "var(--coral-50)",
                  border: "1px solid rgba(255,107,107,.2)",
                  borderRadius: 12,
                  padding: "10px 14px",
                  marginTop: 16,
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </div>
            )}

            <div data-animate style={{ marginTop: 20 }}>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-[15px] font-bold rounded-[14px] gap-2"
                style={{ boxShadow: "var(--sh-indigo)" }}
              >
                {isPending ? "Criando conta…" : "Criar conta"}
                <LoginIcon name="arrowrt" size={17} />
              </Button>
            </div>

            <div data-animate>
              <SignInPrompt />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
