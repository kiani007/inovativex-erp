import { AppShell } from "@/components/layouts/app-shell";

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
