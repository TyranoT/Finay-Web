"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/shared/hook/useSession";
import { Sidebar, SidebarSkeleton } from "./sidebar";
import { AppTopbar } from "./app-topbar";
import { NovoLancamentoDrawer } from "@/features/transacoes/components/novo-lancamento-drawer";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Shell principal do app autenticado.
 *
 * Combina sidebar expressivo, topbar com seletor de grupo e drawer global
 * de "Novo lançamento". Redireciona para `/` quando o usuário não está
 * autenticado.
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
      <main className="fx-main">
        <AppTopbar />
        {children}
      </main>
      <NovoLancamentoDrawer />
    </div>
  );
}
