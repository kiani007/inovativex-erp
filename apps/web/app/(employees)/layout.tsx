import { AppShell } from "@/components/layouts/app-shell";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
