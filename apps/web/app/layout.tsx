import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inovativex ERP",
  description:
    "Modern enterprise resource planning system for Inovativex — manage employees, HR, projects, clients, and finances in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
