"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useCategorias } from "@/features/transacoes/api/use-categorias";
import { useLugares } from "../api/use-lugares";
import { usePessoas } from "../api/use-pessoas";
import { useItens } from "../api/use-itens";
import {
  useDeletarCategoria,
  useDeletarLugar,
  useDeletarPessoa,
  useDeletarItem,
} from "../api/use-cadastros-mutations";
import { useCadastroDrawerStore } from "../states/cadastro-drawer-store";
import { CategoriaTree } from "../ui/categoria-tree";
import { PessoasGrid } from "../ui/pessoas-grid";
import { TagCloud } from "../ui/tag-cloud";
import { EyebrowCta } from "../ui/eyebrow-cta";
import { CadastroDrawer } from "../ui/cadastro-drawer";
import type { Categoria } from "@/features/transacoes/types";
import type { Lugar, Pessoa, Item } from "../types";

function confirmar(mensagem: string): boolean {
  if (typeof window === "undefined") return true;
  return window.confirm(mensagem);
}

/**
 * Página Cadastros — gerencia categorias, pessoas, lugares e itens
 * com CRUD inline (criar/editar via drawer, excluir via confirm).
 */
export function CadastrosPage() {
  const { escopo } = useGrupoAtivo();
  const { data: categorias = [], isLoading: loadCat } = useCategorias();
  const { data: lugares = [], isLoading: loadLug } = useLugares();
  const { data: pessoas = [], isLoading: loadPes } = usePessoas();
  const { data: itens = [], isLoading: loadIt } = useItens();

  const abrirDrawer = useCadastroDrawerStore((s) => s.abrir);

  const deletarCategoria = useDeletarCategoria();
  const deletarLugar = useDeletarLugar();
  const deletarPessoa = useDeletarPessoa();
  const deletarItem = useDeletarItem();

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "cadastros pessoais" : `cadastros de ${escopo.nome}`;
  useTopbar({
    titulo: "Cadastros",
    subtitulo: sufixoEscopo,
  });

  function handleDeletarCategoria(cat: Categoria) {
    if (!confirmar(`Excluir a categoria "${cat.nome}"?`)) return;
    deletarCategoria.mutate(cat.uid);
  }

  function handleDeletarLugar(lug: Lugar) {
    if (!confirmar(`Excluir o lugar "${lug.nome}"?`)) return;
    deletarLugar.mutate(lug.uid);
  }

  function handleDeletarPessoa(pes: Pessoa) {
    if (!confirmar(`Excluir "${pes.nome}"?`)) return;
    deletarPessoa.mutate(pes.uid);
  }

  function handleDeletarItem(it: Item) {
    if (!confirmar(`Excluir o item "${it.nome}"?`)) return;
    deletarItem.mutate(it.uid);
  }

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
          <EyebrowCta
            label="Categorias"
            hint={`${categorias.length} ${categorias.length === 1 ? "raiz" : "raízes"}`}
            ctaLabel="Nova categoria"
            onCta={() => abrirDrawer("categoria")}
          />
          <CategoriaTree
            categorias={categorias}
            isLoading={loadCat}
            onEdit={(cat) => abrirDrawer("categoria", cat)}
            onDelete={handleDeletarCategoria}
          />
        </section>

        <div className="col gap-6">
          <section className="col gap-3">
            <EyebrowCta
              label="Pessoas"
              hint={`${pessoas.length} ${pessoas.length === 1 ? "pessoa" : "pessoas"}`}
              ctaLabel="Nova pessoa"
              onCta={() => abrirDrawer("pessoa")}
            />
            <PessoasGrid
              pessoas={pessoas}
              isLoading={loadPes}
              onEdit={(p) => abrirDrawer("pessoa", p)}
              onDelete={handleDeletarPessoa}
            />
          </section>

          <section className="col gap-3">
            <EyebrowCta
              label="Lugares"
              hint={`${lugares.length} ${lugares.length === 1 ? "endereço" : "endereços"}`}
              ctaLabel="Novo lugar"
              onCta={() => abrirDrawer("lugar")}
            />
            <TagCloud
              itens={lugares}
              emptyLabel="Sem lugares cadastrados."
              isLoading={loadLug}
              onEdit={(it) => abrirDrawer("lugar", it as Lugar)}
              onDelete={(it) => handleDeletarLugar(it as Lugar)}
            />
          </section>

          <section className="col gap-3">
            <EyebrowCta
              label="Itens"
              hint={`${itens.length} ${itens.length === 1 ? "produto" : "produtos"}`}
              ctaLabel="Novo item"
              onCta={() => abrirDrawer("item")}
            />
            <TagCloud
              itens={itens}
              emptyLabel="Sem itens cadastrados."
              isLoading={loadIt}
              onEdit={(it) => abrirDrawer("item", it as Item)}
              onDelete={(it) => handleDeletarItem(it as Item)}
            />
          </section>
        </div>
      </div>

      <CadastroDrawer />
    </div>
  );
}
