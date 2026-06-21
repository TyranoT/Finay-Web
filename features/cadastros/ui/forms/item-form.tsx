"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import type { Item } from "../../types";
import {
  useCriarItem,
  useEditarItem,
} from "../../api/use-cadastros-mutations";
import { itemSchema, type ItemFormData } from "../../schemas/item.schema";
import { CadastroDrawerShell } from "../cadastro-drawer-shell";
import { CadastroFormFooter } from "../cadastro-form-footer";
import { FormField } from "./form-field";
import { FormErroBanner } from "./form-erro-banner";

interface ItemFormProps {
  editando: Item | null;
  onClose: () => void;
}

function buildDefaults(item: Item | null): ItemFormData {
  return { nome: item?.nome ?? "" };
}

export function ItemForm({ editando, onClose }: ItemFormProps) {
  const isEdicao = !!editando;
  const [erroApi, setErroApi] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: buildDefaults(editando),
  });

  const criar = useCriarItem();
  const editar = useEditarItem();
  const isPending = criar.isPending || editar.isPending;

  function onSubmit(data: ItemFormData) {
    setErroApi(undefined);
    const body = { nome: data.nome.trim() };

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
      titulo={isEdicao ? "Editar item" : "Novo item"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
          <FormField id="it-nome" label="NOME" error={errors.nome?.message}>
            <Input
              id="it-nome"
              placeholder="Ex.: Leite integral, Pilha AA"
              autoFocus
              {...register("nome")}
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
