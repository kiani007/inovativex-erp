"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  FolderKanban,
  Handshake,
  DollarSign,
  Monitor,
  FileText,
  Megaphone,
  Settings,
  UserPlus,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    module: "dashboard",
  },
  {
    name: "Employees",
    href: "/employees",
    icon: Users,
    module: "employees",
    children: [
      { name: "Directory", href: "/directory" },
      { name: "Org Chart", href: "/org-chart" },
    ],
  },
  {
    name: "HR",
    href: "/hr/leave",
    icon: Building2,
    module: "hr",
    children: [
      { name: "Leave", href: "/hr/leave" },
      { name: "Attendance", href: "/hr/attendance" },
      { name: "Payroll", href: "/hr/payroll" },
      { name: "Performance", href: "/hr/performance" },
      { name: "Training", href: "/hr/training" },
    ],
  },
  {
    name: "Recruitment",
    href: "/recruitment/jobs",
    icon: UserPlus,
    module: "recruitment",
    children: [
      { name: "Jobs", href: "/recruitment/jobs" },
      { name: "Candidates", href: "/recruitment/candidates" },
      { name: "Interviews", href: "/recruitment/interviews" },
    ],
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
    module: "projects",
  },
  {
    name: "Clients",
    href: "/clients",
    icon: Handshake,
    module: "clients",
    children: [
      { name: "All Clients", href: "/clients" },
      { name: "Pipeline", href: "/pipeline" },
    ],
  },
  {
    name: "Finance",
    href: "/finance/invoices",
    icon: DollarSign,
    module: "finance",
    children: [
      { name: "Invoices", href: "/finance/invoices" },
      { name: "Expenses", href: "/finance/expenses" },
      { name: "Budgets", href: "/finance/budgets" },
      { name: "Reports", href: "/finance/reports" },
    ],
  },
  {
    name: "Assets",
    href: "/assets",
    icon: Monitor,
    module: "assets",
    children: [
      { name: "Inventory", href: "/assets" },
      { name: "Licenses", href: "/assets/licenses" },
      { name: "Requests", href: "/assets/requests" },
    ],
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
    module: "documents",
    children: [
      { name: "Files", href: "/documents" },
      { name: "Templates", href: "/documents/templates" },
      { name: "Knowledge Base", href: "/knowledge-base" },
    ],
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: Megaphone,
    module: "communication",
  },
  {
    name: "Admin",
    href: "/admin/users",
    icon: Settings,
    module: "admin",
    children: [
      { name: "Users", href: "/admin/users" },
      { name: "Roles", href: "/admin/roles" },
      { name: "Audit Logs", href: "/admin/audit-logs" },
      { name: "Integrations", href: "/admin/integrations" },
      { name: "Workflows", href: "/admin/workflows" },
      { name: "Settings", href: "/admin/settings" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, hasPermission } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredNav = navigation.filter((item) =>
    hasPermission(item.module, "read")
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
        "bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)]",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-600)] text-white font-bold text-sm">
              IX
            </div>
            <span className="text-lg font-bold text-white">Inovativex</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 hover:bg-[var(--color-sidebar-hover)] transition-colors"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {filteredNav.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + "/") ||
            item.children?.some((child) => pathname === child.href);
          const isExpanded = expandedItem === item.name;
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={() =>
                  item.children &&
                  setExpandedItem(isExpanded ? null : item.name)
                }
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--color-sidebar-active)] text-white"
                    : "hover:bg-[var(--color-sidebar-hover)] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>

              {/* Sub-navigation */}
              {!collapsed && item.children && isExpanded && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                        pathname === child.href
                          ? "text-white font-medium"
                          : "hover:text-white"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User section */}
      {user && !collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-600)] text-white text-sm font-medium">
              {user.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.full_name}
              </p>
              <p className="text-xs truncate">{user.role.replace("_", " ")}</p>
            </div>
            <button className="rounded-md p-1.5 hover:bg-[var(--color-sidebar-hover)] transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
