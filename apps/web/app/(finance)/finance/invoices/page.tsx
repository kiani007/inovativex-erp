"use client";

import {
  Plus,
  Download,
  Search,
  MoreHorizontal,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  Send,
  FileText,
} from "lucide-react";
import { useState } from "react";

const invoices = [
  {
    id: "INV-2026-001",
    client: "Acme Corporation",
    amount: 45000,
    issueDate: "2026-02-01",
    dueDate: "2026-03-01",
    status: "paid" as const,
  },
  {
    id: "INV-2026-002",
    client: "TechStart Solutions",
    amount: 28500,
    issueDate: "2026-02-10",
    dueDate: "2026-03-10",
    status: "sent" as const,
  },
  {
    id: "INV-2026-003",
    client: "Global Dynamics Ltd",
    amount: 72000,
    issueDate: "2026-02-15",
    dueDate: "2026-03-15",
    status: "viewed" as const,
  },
  {
    id: "INV-2026-004",
    client: "Pinnacle Industries",
    amount: 18750,
    issueDate: "2026-01-05",
    dueDate: "2026-02-05",
    status: "overdue" as const,
  },
  {
    id: "INV-2026-005",
    client: "Horizon Media Group",
    amount: 96200,
    issueDate: "2026-02-20",
    dueDate: "2026-03-20",
    status: "draft" as const,
  },
  {
    id: "INV-2026-006",
    client: "NovaTech Inc",
    amount: 53400,
    issueDate: "2026-01-18",
    dueDate: "2026-02-18",
    status: "paid" as const,
  },
];

const statusConfig = {
  draft: {
    label: "Draft",
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-400",
  },
  sent: {
    label: "Sent",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  viewed: {
    label: "Viewed",
    bg: "bg-purple-100",
    text: "text-purple-700",
    dot: "bg-purple-400",
  },
  paid: {
    label: "Paid",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  overdue: {
    label: "Overdue",
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-400",
  },
};

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? inv.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage invoices and track payments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Plus className="h-4 w-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoiced"
          value="$1.2M"
          icon={DollarSign}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Paid"
          value="$890K"
          icon={CheckCircle2}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Outstanding"
          value="$310K"
          icon={Clock}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Overdue"
          value="$42K"
          icon={AlertTriangle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="search"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border bg-[var(--background)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="viewed">Viewed</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[var(--muted)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Invoice #
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Client
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Issue Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                return (
                  <tr
                    key={invoice.id}
                    className="border-b last:border-b-0 hover:bg-[var(--muted)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{invoice.client}</td>
                    <td className="px-4 py-3 font-medium">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {invoice.issueDate}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {invoice.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        {invoice.status === "draft" && (
                          <button
                            className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                            title="Send"
                          >
                            <Send className="h-4 w-4 text-[var(--muted-foreground)]" />
                          </button>
                        )}
                        <button
                          className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                          title="More"
                        >
                          <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
