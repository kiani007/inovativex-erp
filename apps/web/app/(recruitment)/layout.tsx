import { AppShell } from "@/components/layouts/app-shell";

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
