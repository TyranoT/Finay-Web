"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useCriarSaida } from "../api/use-criar-saida";
import { useEditarSaida } from "../api/use-editar-saida";
import { useCategorias } from "../api/use-categorias";
import { useContasTransacoes } from "../api/use-contas-transacoes";
import { toISODate } from "@/shared/helpers/format-date";
import type { Saida, SaidaCriar, Categoria } from "../types";

interface TransacaoFormProps {
  saida?: Saida;
  onClose: () => void;
}

type TipoTransacao = "saida" | "entrada";

function flattenCategorias(cats: Categoria[], tipo: TipoTransacao): Categoria[] {
  const result: Categoria[] = [];
  for (const cat of cats) {
    const matches = tipo === "entrada" ? cat.opcao_entrada : cat.opcao_saida;
    if (matches) result.push(cat);
    if (cat.subcategorias?.length) {
      result.push(...flattenCategorias(cat.subcategorias, tipo));
    }
  }
  return result;
}

const CAT_PALETTE = [
  "#FF8A5B", "#00B894", "#5B5FEF", "#7C6CF5",
  "#F25C9A", "#F59E0B", "#14B8A6", "#16A34A",
  "#EF4444", "#8B5CF6", "#0EA5E9", "#84CC16",
];

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,.42)",
        backdropFilter: "blur(2px)",
        zIndex: 40,
      }}
    />
  );
}

/**
 * Drawer lateral para criar ou editar uma transação.
 */
export function TransacaoForm({ saida, onClose }: TransacaoFormProps) {
  const isEdit = !!saida;
  const initialTipo: TipoTransacao =
    saida?.categoria?.opcao_entrada ? "entrada" : "saida";

  const [tipo, setTipo] = useState<TipoTransacao>(initialTipo);
  const [nome, setNome] = useState(saida?.nome ?? "");
  const [valor, setValor] = useState(saida?.valor ? String(saida.valor) : "");
  const [data, setData] = useState(saida?.data ?? toISODate());
  const [categoriaUid, setCategoriaUid] = useState(saida?.categoria?.uid ?? "");
  const [contaUid, setContaUid] = useState(saida?.conta?.uid ?? "");
  const [descricao, setDescricao] = useState(saida?.descricao ?? "");
  const [erro, setErro] = useState("");

  const { data: categorias } = useCategorias();
  const { data: contas } = useContasTransacoes();
  const criarSaida = useCriarSaida();
  const editarSaida = useEditarSaida();

  const categoriasDisponiveis = categorias ? flattenCategorias(categorias, tipo) : [];

  useEffect(() => { setCategoriaUid(""); }, [tipo]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (!nome.trim()) return setErro("Informe o nome da transação.");
    if (!valor || isNaN(Number(valor))) return setErro("Informe um valor válido.");
    if (!categoriaUid) return setErro("Selecione uma categoria.");
    if (!contaUid) return setErro("Selecione uma conta.");

    const body: SaidaCriar = {
      nome: nome.trim(),
      valor: parseFloat(valor.replace(",", ".")),
      data,
      categoria_uid: categoriaUid,
      conta_uid: contaUid,
      descricao: descricao.trim() || undefined,
    };

    if (isEdit) {
      editarSaida.mutate(
        { uid: saida!.uid, body },
        { onSuccess: onClose, onError: (err) => setErro(err.message) }
      );
    } else {
      criarSaida.mutate(body, {
        onSuccess: onClose,
        onError: (err) => setErro(err.message),
      });
    }
  }

  const isPending = criarSaida.isPending || editarSaida.isPending;
  const tipoColor = tipo === "entrada" ? "var(--jade-600)" : "var(--ink)";

  return (
    <>
      <Overlay onClose={onClose} />
      <form
        onSubmit={handleSubmit}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 460,
          background: "var(--surface)",
          boxShadow: "-20px 0 60px rgba(15,23,42,.22)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font)",
          zIndex: 50,
        }}
      >
        {/* Header */}
        <div
          className="row"
          style={{ justifyContent: "space-between", padding: "22px 26px 0" }}
        >
          <div className="t-h2">{isEdit ? "Editar transação" : "Nova transação"}</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: "1px solid var(--line-2)", background: "var(--surface)",
              display: "grid", placeItems: "center",
              cursor: "pointer", color: "var(--ink-3)", fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        {/* Type chips */}
        <div className="row gap-2" style={{ padding: "18px 26px 0" }}>
          {(["saida", "entrada"] as TipoTransacao[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className="chip"
              style={{
                flex: 1,
                background:
                  tipo === t
                    ? t === "entrada"
                      ? "var(--jade)"
                      : "var(--ink)"
                    : "var(--surface)",
                color: tipo === t ? "#fff" : "var(--ink-2)",
                borderColor: tipo === t ? "transparent" : "var(--line-2)",
              }}
            >
              {t === "entrada" ? "Receita" : "Despesa"}
            </button>
          ))}
        </div>

        {/* Amount display */}
        <div style={{ textAlign: "center", padding: "24px 26px 8px" }}>
          <div className="t-eyebrow" style={{ marginBottom: 8 }}>Valor</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 24, color: "var(--ink-4)", fontWeight: 700 }}>R$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 46,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: tipoColor,
                fontVariantNumeric: "tabular-nums",
                width: 160,
                textAlign: "center",
                fontFamily: "var(--font)",
              }}
            />
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 26px 0" }}>
          {/* Nome */}
          <div className="col" style={{ gap: 6, marginBottom: 16 }}>
            <Label htmlFor="nome">
              <span className="t-xs" style={{ color: "var(--ink-3)" }}>NOME</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex.: iFood, Salário..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Data */}
          <div className="col" style={{ gap: 6, marginBottom: 20 }}>
            <Label htmlFor="data">
              <span className="t-xs" style={{ color: "var(--ink-3)" }}>DATA</span>
            </Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          {/* Category grid */}
          <div className="t-xs" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
            CATEGORIA
          </div>
          {categoriasDisponiveis.length === 0 ? (
            <p className="t-sm muted" style={{ marginBottom: 20 }}>Nenhuma categoria disponível.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {categoriasDisponiveis.map((cat, idx) => {
                const isSelected = categoriaUid === cat.uid;
                const color = CAT_PALETTE[idx % CAT_PALETTE.length];
                return (
                  <button
                    key={cat.uid}
                    type="button"
                    onClick={() => setCategoriaUid(cat.uid)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                      padding: "4px 0",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: color,
                        opacity: isSelected ? 1 : 0.35,
                        boxShadow: isSelected
                          ? `0 0 0 3px var(--surface), 0 0 0 5px ${color}`
                          : "none",
                        display: "grid",
                        placeItems: "center",
                        transition: "opacity .15s, box-shadow .15s",
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>
                        {cat.nome[0].toUpperCase()}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        textAlign: "center",
                        color: isSelected ? "var(--ink)" : "var(--ink-4)",
                        maxWidth: 64,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cat.nome}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Conta */}
          <div className="t-xs" style={{ color: "var(--ink-3)", marginBottom: 10 }}>
            CONTA
          </div>
          <div className="col gap-2" style={{ marginBottom: 20 }}>
            {(contas ?? []).length === 0 ? (
              <p className="t-sm muted">Nenhuma conta disponível.</p>
            ) : (
              (contas ?? []).map((conta) => {
                const isSelected = contaUid === conta.uid;
                return (
                  <button
                    key={conta.uid}
                    type="button"
                    onClick={() => setContaUid(conta.uid)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 14px",
                      cursor: "pointer",
                      border: `${isSelected ? 2 : 1}px solid ${isSelected ? "var(--indigo)" : "var(--line-2)"}`,
                      borderRadius: 14,
                      background: isSelected ? "var(--indigo-50)" : "var(--surface)",
                      textAlign: "left",
                      fontFamily: "var(--font)",
                      transition: "border-color .12s, background .12s",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: "var(--indigo)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>
                        {conta.nome[0].toUpperCase()}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="t-sm" style={{ fontWeight: 700 }}>{conta.nome}</div>
                      {conta.banco && (
                        <div className="t-xs muted">{conta.banco.nome}</div>
                      )}
                    </div>
                    {isSelected && (
                      <span style={{ color: "var(--indigo)", flexShrink: 0 }}>
                        <IconCheck />
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Descrição */}
          <div className="col" style={{ gap: 6, marginBottom: 16 }}>
            <Label htmlFor="descricao">
              <span className="t-xs" style={{ color: "var(--ink-3)" }}>DESCRIÇÃO (OPCIONAL)</span>
            </Label>
            <Input
              id="descricao"
              placeholder="Observações..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {erro && (
            <div
              className="t-sm"
              style={{
                color: "var(--coral)",
                background: "var(--coral-50)",
                padding: "10px 14px",
                borderRadius: 10,
                marginBottom: 16,
              }}
            >
              {erro}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="row gap-3"
          style={{ padding: 22, borderTop: "1px solid var(--line)", flexShrink: 0 }}
        >
          <button
            type="button"
            className="btn btn-ghost btn-lg"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-lg grow"
            disabled={isPending}
          >
            <IconCheck />
            {isPending ? "Salvando..." : isEdit ? "Salvar" : "Salvar transação"}
          </button>
        </div>
      </form>
    </>
  );
}
