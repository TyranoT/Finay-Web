"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
  badge?: number;
}

/**
 * Linha de navegação do sidebar (estilo "fx-nav.exp").
 *
 * @param badge - Quando `> 0`, exibe contador coral à direita.
 */
export function SidebarNavItem({
  href,
  label,
  icon,
  isActive,
  badge,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`fx-nav exp${isActive ? " active" : ""}`}
      style={{ textDecoration: "none" }}
    >
      <div className="nico">{icon}</div>
      <span style={{ whiteSpace: "nowrap", flex: 1 }}>{label}</span>
      {badge && badge > 0 ? (
        <span className="fx-nav-badge dot">{badge}</span>
      ) : null}
    </Link>
  );
}
