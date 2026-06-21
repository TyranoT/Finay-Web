"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useCriarConta } from "../api/use-contas-mutations";
import { contaSchema, type ContaFormData } from "../schemas/conta.schema";

interface ContaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const SELECT_STYLE = {
  height: 34,
  width: "100%",
  borderRadius: 8,
  border: "1px solid var(--line-2)",
  background: "var(--surface)",
  color: "var(--ink)",
  padding: "0 10px",
  fontFamily: "var(--font)",
  fontSize: 14,
  outline: "none",
} as const;

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="col" style={{ gap: 6, marginBottom: 16 }}>
      <Label htmlFor={id}>
        <span className="t-xs" style={{ color: "var(--ink-3)" }}>
          {label}
        </span>
      </Label>
      {children}
      {error && (
        <span className="t-xs" style={{ color: "var(--coral)" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.42)",
        backdropFilter: "blur(2px)",
        zIndex: 40,
      }}
    />
  );
}

function toNumber(value?: string): number | undefined {
  if (!value?.trim()) return undefined;
  return Number(value.replace(",", "."));
}

function buildDefaultValues(): ContaFormData {
  return {
    nome: "",
    tipo: "corrente",
    saldo_inicial: "0",
    limite: "",
    dia_vencimento: "",
    dia_fechamento: "",
  };
}

export function ContaDrawer({ isOpen, onClose }: ContaDrawerProps) {
  const [erroApi, setErroApi] = useState<string | undefined>();
  const criar = useCriarConta();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContaFormData>({
    resolver: zodResolver(contaSchema),
    defaultValues: buildDefaultValues(),
  });

  const tipo = useWatch({ control, name: "tipo" });
  const isCartao = tipo === "cartao";

  function handleClose() {
    setErroApi(undefined);
    reset(buildDefaultValues());
    onClose();
  }

  function onSubmit(data: ContaFormData) {
    setErroApi(undefined);

    criar.mutate(
      {
        nome: data.nome.trim(),
        tipo: data.tipo,
        saldo_inicial: toNumber(data.saldo_inicial) ?? 0,
        limite: isCartao ? toNumber(data.limite) : undefined,
        dia_vencimento: isCartao ? toNumber(data.dia_vencimento) : undefined,
        dia_fechamento: isCartao ? toNumber(data.dia_fechamento) : undefined,
      },
      {
        onSuccess: handleClose,
        onError: (err) => setErroApi(err.message),
      },
    );
  }

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClose={handleClose} />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          background: "var(--surface)",
          boxShadow: "-20px 0 60px rgba(15,23,42,.22)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font)",
          zIndex: 50,
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            padding: "22px 26px 18px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="t-h2">Nova conta</div>
          <button
            type="button"
            onClick={handleClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid var(--line-2)",
              background: "var(--surface)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--ink-3)",
              fontSize: 18,
            }}
            aria-label="Fechar"
          >
            x
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
            <Field id="conta-nome" label="NOME" error={errors.nome?.message}>
              <Input
                id="conta-nome"
                placeholder="Ex.: Nubank, Banco do Brasil"
                autoFocus
                {...register("nome")}
              />
            </Field>

            <Field id="conta-tipo" label="TIPO" error={errors.tipo?.message}>
              <select id="conta-tipo" style={SELECT_STYLE} {...register("tipo")}>
                <option value="corrente">Conta corrente</option>
                <option value="poupanca">Poupanca</option>
                <option value="carteira">Carteira</option>
                <option value="cartao">Cartao de credito</option>
              </select>
            </Field>

            <Field
              id="conta-saldo"
              label={isCartao ? "FATURA ATUAL" : "SALDO INICIAL"}
              error={errors.saldo_inicial?.message}
            >
              <Input
                id="conta-saldo"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                {...register("saldo_inicial")}
              />
            </Field>

            {isCartao && (
              <>
                <Field
                  id="conta-limite"
                  label="LIMITE"
                  error={errors.limite?.message}
                >
                  <Input
                    id="conta-limite"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    {...register("limite")}
                  />
                </Field>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <Field
                    id="conta-vencimento"
                    label="VENCIMENTO"
                    error={errors.dia_vencimento?.message}
                  >
                    <Input
                      id="conta-vencimento"
                      type="number"
                      min="1"
                      max="31"
                      placeholder="10"
                      {...register("dia_vencimento")}
                    />
                  </Field>

                  <Field
                    id="conta-fechamento"
                    label="FECHAMENTO"
                    error={errors.dia_fechamento?.message}
                  >
                    <Input
                      id="conta-fechamento"
                      type="number"
                      min="1"
                      max="31"
                      placeholder="3"
                      {...register("dia_fechamento")}
                    />
                  </Field>
                </div>
              </>
            )}

            {erroApi && (
              <div
                className="t-sm"
                style={{
                  color: "var(--coral)",
                  background: "var(--coral-50)",
                  padding: "10px 14px",
                  borderRadius: 10,
                }}
              >
                {erroApi}
              </div>
            )}
          </div>

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
              onClick={handleClose}
              disabled={criar.isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg grow"
              disabled={criar.isPending}
            >
              {criar.isPending ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
