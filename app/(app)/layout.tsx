import { AppShell } from "@/features/app-shell/components/app-shell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
