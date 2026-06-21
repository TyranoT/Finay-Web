"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import type { Categoria } from "@/features/transacoes/types";
import {
  useCriarCategoria,
  useEditarCategoria,
} from "../../api/use-cadastros-mutations";
import {
  categoriaSchema,
  type CategoriaFormData,
} from "../../schemas/categoria.schema";
import { CadastroDrawerShell } from "../cadastro-drawer-shell";
import { CadastroFormFooter } from "../cadastro-form-footer";
import { FormField } from "./form-field";
import { FormErroBanner } from "./form-erro-banner";

interface CategoriaFormProps {
  editando: Categoria | null;
  onClose: () => void;
}

function buildDefaults(cat: Categoria | null): CategoriaFormData {
  return {
    nome: cat?.nome ?? "",
    opcao_entrada: cat?.opcao_entrada ?? false,
    opcao_saida: cat?.opcao_saida ?? true,
  };
}

export function CategoriaForm({ editando, onClose }: CategoriaFormProps) {
  const isEdicao = !!editando;
  const [erroApi, setErroApi] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CategoriaFormData>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: buildDefaults(editando),
  });

  const criar = useCriarCategoria();
  const editar = useEditarCategoria();
  const isPending = criar.isPending || editar.isPending;

  function onSubmit(data: CategoriaFormData) {
    setErroApi(undefined);
    const body = {
      nome: data.nome.trim(),
      opcao_entrada: data.opcao_entrada,
      opcao_saida: data.opcao_saida,
    };

    if (isEdicao && editando) {
      editar.mutate(
        { uid: editando.uid, body },
        {
          onSuccess: onClose,
          onError: (err) => setErroApi(err.message),
        },
      );
      return;
    }

    criar.mutate(body, {
      onSuccess: onClose,
      onError: (err) => setErroApi(err.message),
    });
  }

  return (
    <CadastroDrawerShell
      titulo={isEdicao ? "Editar categoria" : "Nova categoria"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
          <FormField id="cat-nome" label="NOME" error={errors.nome?.message}>
            <Input
              id="cat-nome"
              placeholder="Ex.: Alimentação, Renda..."
              autoFocus
              {...register("nome")}
            />
          </FormField>

          <div className="t-xs" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
            FLUXO
          </div>
          <div className="col gap-3" style={{ marginBottom: 16 }}>
            <Controller
              control={control}
              name="opcao_entrada"
              render={({ field }) => (
                <label
                  className="row gap-3"
                  style={{
                    cursor: "pointer",
                    padding: "10px 12px",
                    border: "1px solid var(--line-2)",
                    borderRadius: 12,
                  }}
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                  />
                  <div>
                    <div className="t-sm" style={{ fontWeight: 700 }}>
                      Entrada
                    </div>
                    <div className="t-xs muted">
                      Categoria aparece em receitas e recebimentos.
                    </div>
                  </div>
                </label>
              )}
            />
            <Controller
              control={control}
              name="opcao_saida"
              render={({ field }) => (
                <label
                  className="row gap-3"
                  style={{
                    cursor: "pointer",
                    padding: "10px 12px",
                    border: "1px solid var(--line-2)",
                    borderRadius: 12,
                  }}
                >
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                  />
                  <div>
                    <div className="t-sm" style={{ fontWeight: 700 }}>
                      Saída
                    </div>
                    <div className="t-xs muted">
                      Categoria aparece em despesas e pagamentos.
                    </div>
                  </div>
                </label>
              )}
            />
          </div>
          {errors.opcao_saida?.message && (
            <span
              className="t-xs"
              style={{
                color: "var(--coral)",
                display: "block",
                marginTop: -4,
                marginBottom: 14,
              }}
            >
              {errors.opcao_saida.message}
            </span>
          )}

          <FormErroBanner mensagem={erroApi} />
        </div>

        <CadastroFormFooter
          isPending={isPending}
          isEdicao={isEdicao}
          onClose={onClose}
        />
      </form>
    </CadastroDrawerShell>
  );
}
