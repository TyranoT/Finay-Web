"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/shared/hook/useSession";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Início",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/transacoes",
    label: "Transações",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="3" x2="8" y2="21" />
        <polyline points="3 8 8 3 13 8" />
        <line x1="16" y1="21" x2="16" y2="3" />
        <polyline points="21 16 16 21 11 16" />
      </svg>
    ),
  },
  {
    href: "/contas",
    label: "Contas",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h.01M11 15h2" />
      </svg>
    ),
  },
  {
    href: "/categorias",
    label: "Categorias",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
];

function IconPlus() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--ink-4)", flexShrink: 0 }}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="fx-sidebar exp">
      <div style={{ height: 32, width: 80, background: "var(--line-2)", borderRadius: 8, margin: "4px 6px 16px" }} />
      <div style={{ height: 42, background: "var(--line-2)", borderRadius: 14, marginBottom: 10 }} />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ height: 38, background: "var(--line-2)", borderRadius: 14, marginBottom: 4 }} />
      ))}
    </aside>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { session, signout } = useSession();

  const initials =
    (session?.nome ?? "U")
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0] ?? "")
      .join("")
      .toUpperCase() || "U";

  return (
    <aside className="fx-sidebar exp">
      {/* Logo */}
      <Link
        href="/dashboard"
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "2px 6px 12px" }}
      >
        <div className="fx-logo-mark" style={{ width: 32, height: 32, borderRadius: 10 }}>
          <span style={{ fontSize: 17 }}>f</span>
        </div>
        <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--ink)" }}>
          Finay
        </span>
      </Link>

      {/* Add button */}
      <Link href="/transacoes" style={{ textDecoration: "none", marginBottom: 8 }}>
        <button
          className="btn btn-block"
          style={{
            background: "var(--indigo)",
            color: "#fff",
            boxShadow: "var(--sh-indigo)",
            padding: "11px 16px",
            borderRadius: 14,
            fontSize: 14.5,
          }}
        >
          <IconPlus />
          Adicionar
        </button>
      </Link>

      {/* Nav items */}
      <div className="fx-navgroup" style={{ marginTop: 6 }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`fx-nav exp${isActive ? " active" : ""}`}
              style={{ textDecoration: "none" }}
            >
              <div className="nico">{item.icon}</div>
              <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Invite card */}
      <div className="fx-invite" style={{ marginTop: 12 }}>
        <div className="ttl">Convide e ganhe 🎁</div>
        <div className="sub">Cada amigo que entra rende R$ 15 pra vocês dois.</div>
      </div>

      {/* User footer */}
      <hr className="divider" style={{ marginTop: "auto", marginBottom: 8 }} />
      {session && (
        <button
          className="fx-me"
          onClick={signout}
          title="Clique para sair"
          style={{ width: "100%", background: "none", border: "none", fontFamily: "inherit" }}
        >
          <div
            className="av av-md"
            style={{ background: "var(--indigo)", flexShrink: 0, border: "none" }}
          >
            {initials}
          </div>
          <div className="fx-me-info">
            <div className="fx-me-name">{session.nome}</div>
            <div className="fx-me-sub">Plano Pessoal</div>
          </div>
          <IconSettings />
        </button>
      )}
    </aside>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Shell principal do app autenticado — sidebar expressivo + área de conteúdo.
 */
export function AppShell({ children }: AppShellProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="finay-app warm" style={{ height: "100vh", overflow: "hidden" }}>
        <SidebarSkeleton />
        <main className="fx-main" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="finay-app warm" style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main className="fx-main">{children}</main>
    </div>
  );
}
