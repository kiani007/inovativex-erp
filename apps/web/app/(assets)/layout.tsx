import { AppShell } from "@/components/layouts/app-shell";

export default function AssetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
