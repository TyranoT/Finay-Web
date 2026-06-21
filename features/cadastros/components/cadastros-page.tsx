"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useCategorias } from "@/features/transacoes/api/use-categorias";
import { useLugares } from "../api/use-lugares";
import { usePessoas } from "../api/use-pessoas";
import { useItens } from "../api/use-itens";
import { CategoriaTree } from "../ui/categoria-tree";
import { PessoasGrid } from "../ui/pessoas-grid";
import { TagCloud } from "../ui/tag-cloud";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

/**
 * Página Cadastros — categorias hierárquicas, pessoas, lugares e itens
 * organizados em capítulos editoriais com eyebrows.
 */
export function CadastrosPage() {
  const { escopo } = useGrupoAtivo();
  const { data: categorias = [], isLoading: loadCat } = useCategorias();
  const { data: lugares = [], isLoading: loadLug } = useLugares();
  const { data: pessoas = [], isLoading: loadPes } = usePessoas();
  const { data: itens = [], isLoading: loadIt } = useItens();

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "cadastros pessoais" : `cadastros de ${escopo.nome}`;
  useTopbar({
    titulo: "Cadastros",
    subtitulo: sufixoEscopo,
  });

  return (
    <div className="fx-content col gap-6">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        <section className="col gap-3">
          <SectionEyebrow
            label="Categorias"
            hint={`${categorias.length} ${categorias.length === 1 ? "raiz" : "raízes"}`}
          />
          <CategoriaTree categorias={categorias} isLoading={loadCat} />
        </section>

        <div className="col gap-6">
          <section className="col gap-3">
            <SectionEyebrow
              label="Pessoas"
              hint={`${pessoas.length} ${pessoas.length === 1 ? "pessoa" : "pessoas"}`}
            />
            <PessoasGrid pessoas={pessoas} isLoading={loadPes} />
          </section>

          <section className="col gap-3">
            <SectionEyebrow
              label="Lugares"
              hint={`${lugares.length} ${lugares.length === 1 ? "endereço" : "endereços"}`}
            />
            <TagCloud
              itens={lugares}
              emptyLabel="Sem lugares cadastrados."
              isLoading={loadLug}
            />
          </section>

          <section className="col gap-3">
            <SectionEyebrow
              label="Itens"
              hint={`${itens.length} ${itens.length === 1 ? "produto" : "produtos"}`}
            />
            <TagCloud
              itens={itens}
              emptyLabel="Sem itens cadastrados."
              isLoading={loadIt}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
