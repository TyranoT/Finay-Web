"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import type { Lugar } from "../../types";
import {
  useCriarLugar,
  useEditarLugar,
} from "../../api/use-cadastros-mutations";
import { lugarSchema, type LugarFormData } from "../../schemas/lugar.schema";
import { CadastroDrawerShell } from "../cadastro-drawer-shell";
import { CadastroFormFooter } from "../cadastro-form-footer";
import { FormField } from "./form-field";
import { FormErroBanner } from "./form-erro-banner";

interface LugarFormProps {
  editando: Lugar | null;
  onClose: () => void;
}

function buildDefaults(lugar: Lugar | null): LugarFormData {
  return {
    nome: lugar?.nome ?? "",
    cidade: lugar?.cidade ?? "",
    estado: lugar?.estado ?? "",
  };
}

export function LugarForm({ editando, onClose }: LugarFormProps) {
  const isEdicao = !!editando;
  const [erroApi, setErroApi] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LugarFormData>({
    resolver: zodResolver(lugarSchema),
    defaultValues: buildDefaults(editando),
  });

  const criar = useCriarLugar();
  const editar = useEditarLugar();
  const isPending = criar.isPending || editar.isPending;

  function onSubmit(data: LugarFormData) {
    setErroApi(undefined);
    const body = {
      nome: data.nome.trim(),
      cidade: data.cidade?.trim() || undefined,
      estado: data.estado?.trim().toUpperCase() || undefined,
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
      titulo={isEdicao ? "Editar lugar" : "Novo lugar"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
          <FormField id="lug-nome" label="NOME" error={errors.nome?.message}>
            <Input
              id="lug-nome"
              placeholder="Ex.: Pão de Açúcar Centro"
              autoFocus
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="lug-cidade"
            label="CIDADE (OPCIONAL)"
            error={errors.cidade?.message}
          >
            <Input
              id="lug-cidade"
              placeholder="Ex.: São Paulo"
              {...register("cidade")}
            />
          </FormField>

          <FormField
            id="lug-estado"
            label="ESTADO (OPCIONAL)"
            hint="Sigla de 2 letras"
            error={errors.estado?.message}
          >
            <Input
              id="lug-estado"
              placeholder="Ex.: SP"
              maxLength={2}
              {...register("estado")}
            />
          </FormField>

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
