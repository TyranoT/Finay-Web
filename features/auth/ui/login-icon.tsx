const ICON_PATHS: Record<string, string> = {
  mail:    "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3.5 6.5l8.5 6 8.5-6",
  lock:    "M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5zM12 14v3",
  arrowrt: "M5 12h14M13 6l6 6-6 6",
  spark:   "M12 3c.4 4.2 2.8 6.6 7 7-4.2.4-6.6 2.8-7 7-.4-4.2-2.8-6.6-7-7 4.2-.4 6.6-2.8 7-7M19 4l.4 1.6L21 6l-1.6.4L19 8l-.4-1.6L17 6l1.6-.4z",
  google:  "M21 12.2c0-.7-.06-1.4-.18-2.05H12v3.9h5.05a4.3 4.3 0 0 1-1.87 2.8v2.3h3.02C19.96 17.5 21 15.1 21 12.2zM12 21.5c2.53 0 4.65-.84 6.2-2.27l-3.02-2.3c-.84.56-1.9.9-3.18.9-2.44 0-4.5-1.65-5.24-3.86H3.64v2.37A9.5 9.5 0 0 0 12 21.5zM6.76 13.97a5.7 5.7 0 0 1 0-3.64V7.96H3.64a9.5 9.5 0 0 0 0 8.55zM12 6.47c1.38 0 2.6.47 3.58 1.4l2.67-2.67A9.5 9.5 0 0 0 12 2.5a9.5 9.5 0 0 0-8.36 4.96l3.12 2.37C7.5 8.12 9.56 6.47 12 6.47z",
  user:    "M12 13c3.31 0 6 2.69 6 6H6c0-3.31 2.69-6 6-6zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  phone:   "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.18 21 3 13.82 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.33.03.73-.27 1z",
  check:   "M20 6L9 17l-5-5",
};

interface LoginIconProps {
  name: string;
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
  className?: string;
}

/**
 * Ícone SVG do sistema de design Finay.
 *
 * @param name - Chave do ícone: mail | lock | arrowrt | spark | google | user | phone | check
 */
export function LoginIcon({
  name,
  size = 20,
  stroke,
  fill = "none",
  sw = 1.7,
  className,
}: LoginIconProps) {
  const d = ICON_PATHS[name];
  if (!d) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke ?? "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );
}
