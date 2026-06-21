/**
 * Conjunto de ícones SVG do shell do app.
 *
 * Cada ícone é um componente pequeno e sem props para encaixar nas linhas
 * de navegação (24x24, stroke `currentColor`). Mantemos um arquivo só para
 * evitar poluir o `app-shell.tsx` com SVG inline.
 */
function Svg({ children, size = 18 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const IconDashboard = () => (
  <Svg>
    <rect x="3" y="3" width="7" height="9" rx="1.6" />
    <rect x="14" y="3" width="7" height="5" rx="1.6" />
    <rect x="14" y="12" width="7" height="9" rx="1.6" />
    <rect x="3" y="16" width="7" height="5" rx="1.6" />
  </Svg>
);

export const IconLancamentos = () => (
  <Svg>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="14" y2="17" />
  </Svg>
);

export const IconPrevistos = () => (
  <Svg>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </Svg>
);

export const IconAnalise = () => (
  <Svg>
    <path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-7" />
  </Svg>
);

export const IconInvestimentos = () => (
  <Svg>
    <path d="M3 17l6-6 4 4 8-8M16 7h5v5" />
  </Svg>
);

export const IconAtivos = () => (
  <Svg>
    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
  </Svg>
);

export const IconContas = () => (
  <Svg>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
  </Svg>
);

export const IconCadastros = () => (
  <Svg>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const IconGrupos = () => (
  <Svg>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.2a3 3 0 0 1 0 5.6M21 19a5.5 5.5 0 0 0-4-5.3" />
  </Svg>
);

export const IconAprovacoes = () => (
  <Svg>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4.5" />
  </Svg>
);

export const IconIA = () => (
  <Svg>
    <path d="M12 3v2M12 19v2M5 12H3M21 12h-2" />
    <rect x="6" y="6" width="12" height="12" rx="3.5" />
    <circle cx="9.5" cy="11" r="1" fill="currentColor" />
    <circle cx="14.5" cy="11" r="1" fill="currentColor" />
  </Svg>
);

export const IconConquistas = () => (
  <Svg>
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 18h6M12 13v5" />
  </Svg>
);

export const IconLojas = () => (
  <Svg>
    <path d="M4 9l1.2-4.2A1 1 0 0 1 6.16 4h11.68a1 1 0 0 1 .96.8L20 9M4 9h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zM4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
  </Svg>
);

export const IconSettings = () => (
  <Svg size={17}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Svg>
);

export const IconPlus = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
