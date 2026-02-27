import { AppShell } from "@/components/layouts/app-shell";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
