import { AppShell } from "@/components/layouts/app-shell";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
