"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { useSessionContext } from "@/global";
import { isApiResponseError } from "@/shared/http/fetcher";
import { BrandPanel } from "../ui/brand-panel";
import { InputField } from "../ui/input-field";
import { LoginIcon } from "../ui/login-icon";
import { useLogin } from "../api/use-login";
import { useLoginAnimation } from "../hooks/use-login-animation";

const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

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

function ForgotPasswordButton() {
  return (
    <button
      type="button"
      className="text-[13.5px] font-bold"
      style={{
        color: "var(--indigo-600)",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font)",
      }}
    >
      Esqueci a senha
    </button>
  );
}

function SignUpPrompt() {
  const router = useRouter();

  return (
    <p className="t-sm muted text-center mt-6">
      Novo no Finay?{" "}
      <button
        type="button"
        onClick={() => router.push("/register")}
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
        Criar conta gratuita
      </button>
    </p>
  );
}

/** Tela de login do Finay com animações de entrada via anime.js. */
export function LoginForm() {
  const router = useRouter();
  const { signIn } = useSessionContext();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: login, isPending } = useLogin();
  const { brandRef, formRef, formItemsRef } = useLoginAnimation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value;

    login(
      { email, senha },
      {
        onSuccess: (data) => {
          setCookie(null, "token", data.access_token, {
            path: "/",
            maxAge: rememberMe ? REMEMBER_ME_MAX_AGE : undefined,
          });
          signIn(data.access_token);
          router.push("/dashboard");
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

  function togglePassword() {
    setShowPassword((v) => !v);
  }

  function handleRememberMe(checked: boolean | "indeterminate") {
    setRememberMe(checked === true);
  }

  return (
    <div className="finay-app warm" style={{ height: "100vh", overflow: "hidden" }}>
      <BrandPanel ref={brandRef} />

      <div
        ref={formRef}
        className="opacity-0"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 392 }}>
          <div ref={formItemsRef}>
            <div data-animate>
              <p className="t-eyebrow" style={{ color: "var(--indigo)" }}>
                Entrar na sua conta
              </p>
              <h1 className="t-h1" style={{ marginTop: 8 }}>
                Que bom te ver 🙂
              </h1>
              <p className="t-body muted" style={{ marginTop: 8, marginBottom: 26 }}>
                Use seu e-mail e senha pra continuar.
              </p>
            </div>

            <div className="col gap-4">
              <div data-animate>
                <InputField
                  id="email"
                  label="E-mail"
                  iconName="mail"
                  inputProps={{ type: "email", name: "email", autoComplete: "email" }}
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
                      onToggle={togglePassword}
                    />
                  }
                  inputProps={{
                    type: showPassword ? "text" : "password",
                    name: "senha",
                    autoComplete: "current-password",
                    className:
                      "pl-10 pr-20 h-12 rounded-[14px] text-[15px] font-bold tracking-[3px]",
                    style: { borderColor: "var(--line-2)" },
                  }}
                />
              </div>
            </div>

            <div
              data-animate
              className="flex justify-between items-center mt-4 mb-5"
            >
              <Label
                htmlFor="remember"
                className="flex items-center gap-2 cursor-pointer text-[13.5px] font-semibold select-none"
                style={{ color: "var(--ink)" }}
              >
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={handleRememberMe}
                  className="border-(--line-2) data-checked:bg-(--indigo) data-checked:border-(--indigo)"
                />
                Manter conectada
              </Label>
              <ForgotPasswordButton />
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
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                {errorMessage}
              </div>
            )}

            <div data-animate>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-[15px] font-bold rounded-[14px] gap-2"
                style={{ boxShadow: "var(--sh-indigo)" }}
              >
                {isPending ? "Entrando…" : "Entrar"}
                <LoginIcon name="arrowrt" size={17} />
              </Button>
            </div>

            <div data-animate className="mt-4">
              <SignUpPrompt />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
