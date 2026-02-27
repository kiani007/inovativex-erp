import { AppShell } from "@/components/layouts/app-shell";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
