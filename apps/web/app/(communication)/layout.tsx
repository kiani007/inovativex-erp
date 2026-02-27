import { AppShell } from "@/components/layouts/app-shell";

export default function CommunicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
