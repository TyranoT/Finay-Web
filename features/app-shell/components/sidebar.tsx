"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/shared/hook/useSession";
import { useAprovacoesPendentes } from "@/shared/api/use-aprovacoes-pendentes";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarPlanoCard } from "./sidebar-plano-card";
import {
  IconAnalise,
  IconAprovacoes,
  IconAtivos,
  IconCadastros,
  IconConquistas,
  IconContas,
  IconDashboard,
  IconGrupos,
  IconIA,
  IconInvestimentos,
  IconLancamentos,
  IconLojas,
  IconPrevistos,
  IconSettings,
} from "./sidebar-icons";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard", label: "Visão geral", icon: <IconDashboard /> },
      { href: "/transacoes", label: "Lançamentos", icon: <IconLancamentos /> },
      { href: "/previstos", label: "Previstos & faturas", icon: <IconPrevistos /> },
      { href: "/analise", label: "Análise financeira", icon: <IconAnalise /> },
      { href: "/investimentos", label: "Investimentos", icon: <IconInvestimentos /> },
      { href: "/ativos", label: "Ativos & patrimônio", icon: <IconAtivos /> },
    ],
  },
  {
    label: "Estrutura",
    items: [
      { href: "/contas", label: "Contas & cartões", icon: <IconContas /> },
      { href: "/cadastros", label: "Cadastros", icon: <IconCadastros /> },
    ],
  },
  {
    label: "Colaboração",
    items: [
      { href: "/grupos", label: "Grupos", icon: <IconGrupos /> },
      { href: "/aprovacoes", label: "Aprovações", icon: <IconAprovacoes /> },
    ],
  },
  {
    label: "Mais",
    items: [
      { href: "/ia", label: "Assistente IA", icon: <IconIA /> },
      { href: "/conquistas", label: "Conquistas", icon: <IconConquistas /> },
      { href: "/lojas", label: "Lojas", icon: <IconLojas /> },
    ],
  },
];

function getInitials(nome: string): string {
  return (
    nome
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0] ?? "")
      .join("")
      .toUpperCase() || "U"
  );
}

function isItemActive(itemHref: string, pathname: string): boolean {
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { session, signout } = useSession();
  const aprovacoesPendentes = useAprovacoesPendentes();
  const initials = getInitials(session?.nome ?? "U");

  return (
    <aside className="fx-sidebar exp">
      <Link
        href="/dashboard"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "2px 6px 12px",
        }}
      >
        <div
          className="fx-logo-mark"
          style={{ width: 32, height: 32, borderRadius: 10 }}
        >
          <span style={{ fontSize: 17 }}>f</span>
        </div>
        <span
          style={{
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "var(--ink)",
          }}
        >
          Finay
        </span>
      </Link>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
          margin: "0 -4px",
          padding: "0 4px",
          gap: 2,
        }}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="fx-navlabel-section">{section.label}</div>
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isItemActive(item.href, pathname)}
                badge={item.href === "/aprovacoes" ? aprovacoesPendentes : undefined}
              />
            ))}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: 10 }}>
        <SidebarPlanoCard />
      </div>

      <hr className="divider" style={{ margin: "12px 0 8px" }} />
      {session && (
        <button
          className="fx-me"
          onClick={signout}
          title="Clique para sair"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            fontFamily: "inherit",
          }}
        >
          <div
            className="av av-md"
            style={{
              background: "var(--indigo)",
              flexShrink: 0,
              border: "none",
            }}
          >
            {initials}
          </div>
          <div className="fx-me-info">
            <div className="fx-me-name">{session.nome}</div>
            <div className="fx-me-sub">
              {session.grupo_uid ? "Membro de grupo" : "Plano Pessoal"}
            </div>
          </div>
          <IconSettings />
        </button>
      )}
    </aside>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="fx-sidebar exp">
      <div
        style={{
          height: 32,
          width: 80,
          background: "var(--line-2)",
          borderRadius: 8,
          margin: "4px 6px 16px",
        }}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          style={{
            height: 38,
            background: "var(--line-2)",
            borderRadius: 14,
            marginBottom: 4,
          }}
        />
      ))}
    </aside>
  );
}
