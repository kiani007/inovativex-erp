import { AppShell } from "@/components/layouts/app-shell";

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
