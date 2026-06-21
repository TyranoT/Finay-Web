"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/input";
import type { Pessoa } from "../../types";
import {
  useCriarPessoa,
  useEditarPessoa,
} from "../../api/use-cadastros-mutations";
import {
  pessoaSchema,
  type PessoaFormData,
} from "../../schemas/pessoa.schema";
import { CadastroDrawerShell } from "../cadastro-drawer-shell";
import { CadastroFormFooter } from "../cadastro-form-footer";
import { FormField } from "./form-field";
import { FormErroBanner } from "./form-erro-banner";

interface PessoaFormProps {
  editando: Pessoa | null;
  onClose: () => void;
}

function buildDefaults(pessoa: Pessoa | null): PessoaFormData {
  return {
    nome: pessoa?.nome ?? "",
    email: pessoa?.email ?? "",
    cpf_cnpj: pessoa?.cpf_cnpj ?? "",
  };
}

export function PessoaForm({ editando, onClose }: PessoaFormProps) {
  const isEdicao = !!editando;
  const [erroApi, setErroApi] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PessoaFormData>({
    resolver: zodResolver(pessoaSchema),
    defaultValues: buildDefaults(editando),
  });

  const criar = useCriarPessoa();
  const editar = useEditarPessoa();
  const isPending = criar.isPending || editar.isPending;

  function onSubmit(data: PessoaFormData) {
    setErroApi(undefined);
    const body = {
      nome: data.nome.trim(),
      email: data.email?.trim() || undefined,
      cpf_cnpj: data.cpf_cnpj?.trim() || undefined,
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
      titulo={isEdicao ? "Editar pessoa" : "Nova pessoa"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 26px" }}>
          <FormField id="pes-nome" label="NOME" error={errors.nome?.message}>
            <Input
              id="pes-nome"
              placeholder="Nome completo"
              autoFocus
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="pes-email"
            label="E-MAIL (OPCIONAL)"
            error={errors.email?.message}
          >
            <Input
              id="pes-email"
              type="email"
              placeholder="nome@exemplo.com"
              {...register("email")}
            />
          </FormField>

          <FormField
            id="pes-doc"
            label="CPF / CNPJ (OPCIONAL)"
            error={errors.cpf_cnpj?.message}
          >
            <Input
              id="pes-doc"
              placeholder="000.000.000-00"
              {...register("cpf_cnpj")}
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
