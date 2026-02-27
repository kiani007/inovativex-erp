"use client";

import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  Shield,
  Settings,
  FileText,
  UserPlus,
  Trash2,
  Edit,
  LogIn,
  Key,
} from "lucide-react";
import { useState } from "react";

const auditLogs = [
  {
    id: "LOG-001",
    timestamp: "2026-02-27 10:14:32",
    user: "Alex Thompson",
    action: "Updated" as const,
    module: "Settings",
    entity: "Company working hours",
    ipAddress: "192.168.1.45",
    icon: Settings,
  },
  {
    id: "LOG-002",
    timestamp: "2026-02-27 09:58:11",
    user: "Aisha Patel",
    action: "Created" as const,
    module: "HR",
    entity: "Leave request #LR-2026-089",
    ipAddress: "192.168.1.112",
    icon: FileText,
  },
  {
    id: "LOG-003",
    timestamp: "2026-02-27 09:42:05",
    user: "Sarah Chen",
    action: "Approved" as const,
    module: "Finance",
    entity: "Expense report #EXP-007",
    ipAddress: "10.0.0.23",
    icon: Shield,
  },
  {
    id: "LOG-004",
    timestamp: "2026-02-27 09:15:48",
    user: "Alex Thompson",
    action: "Login" as const,
    module: "Auth",
    entity: "Session started via SSO",
    ipAddress: "192.168.1.45",
    icon: LogIn,
  },
  {
    id: "LOG-005",
    timestamp: "2026-02-27 08:52:30",
    user: "Marcus Johnson",
    action: "Updated" as const,
    module: "Projects",
    entity: "Project 'Mobile App Redesign' status",
    ipAddress: "10.0.0.87",
    icon: Edit,
  },
  {
    id: "LOG-006",
    timestamp: "2026-02-26 17:30:22",
    user: "Emily Rodriguez",
    action: "Deleted" as const,
    module: "Documents",
    entity: "Draft proposal v2.docx",
    ipAddress: "192.168.1.204",
    icon: Trash2,
  },
  {
    id: "LOG-007",
    timestamp: "2026-02-26 16:45:19",
    user: "Aisha Patel",
    action: "Created" as const,
    module: "Employees",
    entity: "New employee record #INX-042",
    ipAddress: "192.168.1.112",
    icon: UserPlus,
  },
  {
    id: "LOG-008",
    timestamp: "2026-02-26 15:12:55",
    user: "James Wilson",
    action: "Updated" as const,
    module: "Finance",
    entity: "Invoice #INV-2026-003 status to 'Sent'",
    ipAddress: "10.0.0.156",
    icon: FileText,
  },
  {
    id: "LOG-009",
    timestamp: "2026-02-26 14:08:33",
    user: "Alex Thompson",
    action: "Updated" as const,
    module: "Admin",
    entity: "Role permissions for 'team_lead'",
    ipAddress: "192.168.1.45",
    icon: Key,
  },
  {
    id: "LOG-010",
    timestamp: "2026-02-26 11:25:07",
    user: "Li Wei",
    action: "Exported" as const,
    module: "Finance",
    entity: "Q1 2026 budget report",
    ipAddress: "192.168.1.78",
    icon: Download,
  },
];

const actionConfig = {
  Created: { bg: "bg-green-100", text: "text-green-700" },
  Updated: { bg: "bg-blue-100", text: "text-blue-700" },
  Deleted: { bg: "bg-red-100", text: "text-red-700" },
  Approved: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Login: { bg: "bg-purple-100", text: "text-purple-700" },
  Exported: { bg: "bg-orange-100", text: "text-orange-700" },
};

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter ? log.module === moduleFilter : true;
    const matchesAction = actionFilter ? log.action === actionFilter : true;
    return matchesSearch && matchesModule && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-[var(--muted-foreground)]">
            Track all system activities and changes.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
          <Download className="h-4 w-4" />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-[var(--card)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-[var(--muted-foreground)]" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="search"
              placeholder="Search by user or entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg border bg-[var(--background)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              type="date"
              defaultValue="2026-02-26"
              className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
            />
            <span className="text-sm text-[var(--muted-foreground)]">to</span>
            <input
              type="date"
              defaultValue="2026-02-27"
              className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
            />
          </div>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
          >
            <option value="">All Modules</option>
            <option value="Auth">Auth</option>
            <option value="Admin">Admin</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Projects">Projects</option>
            <option value="Employees">Employees</option>
            <option value="Documents">Documents</option>
            <option value="Settings">Settings</option>
          </select>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
          >
            <option value="">All Actions</option>
            <option value="Created">Created</option>
            <option value="Updated">Updated</option>
            <option value="Deleted">Deleted</option>
            <option value="Approved">Approved</option>
            <option value="Login">Login</option>
            <option value="Exported">Exported</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[var(--muted)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  User
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Action
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Module
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Entity
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const actionStyle =
                  actionConfig[log.action as keyof typeof actionConfig];
                const Icon = log.icon;
                return (
                  <tr
                    key={log.id}
                    className="border-b last:border-b-0 hover:bg-[var(--muted)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-[var(--muted-foreground)]">
                        {log.timestamp}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[10px] font-medium text-[var(--color-primary-700)]">
                          {log.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-sm">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${actionStyle.bg} ${actionStyle.text}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        <span className="text-sm">{log.module}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-[280px] truncate text-[var(--muted-foreground)]">
                      {log.entity}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-[var(--muted-foreground)]">
                        {log.ipAddress}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination hint */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-xs text-[var(--muted-foreground)]">
            Showing {filteredLogs.length} of {auditLogs.length} entries
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[var(--muted)] transition-colors">
              Previous
            </button>
            <button className="rounded-lg bg-[var(--color-primary-600)] px-3 py-1.5 text-xs font-medium text-white">
              1
            </button>
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[var(--muted)] transition-colors">
              2
            </button>
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[var(--muted)] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
