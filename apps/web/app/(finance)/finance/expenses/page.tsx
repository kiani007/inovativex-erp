"use client";

import {
  Plus,
  Download,
  Search,
  MoreHorizontal,
  Receipt,
  CheckCircle2,
  Clock,
  Eye,
} from "lucide-react";
import { useState } from "react";

const expenses = [
  {
    id: "EXP-001",
    employee: "Sarah Chen",
    category: "Travel",
    description: "Client site visit - San Francisco",
    amount: 1250,
    date: "2026-02-25",
    status: "approved" as const,
    receipt: true,
  },
  {
    id: "EXP-002",
    employee: "Marcus Johnson",
    category: "Software",
    description: "Annual Figma license renewal",
    amount: 480,
    date: "2026-02-22",
    status: "pending" as const,
    receipt: true,
  },
  {
    id: "EXP-003",
    employee: "Emily Rodriguez",
    category: "Equipment",
    description: "Ergonomic keyboard and mouse",
    amount: 320,
    date: "2026-02-20",
    status: "approved" as const,
    receipt: true,
  },
  {
    id: "EXP-004",
    employee: "David Kim",
    category: "Meals",
    description: "Team lunch - Sprint retrospective",
    amount: 185,
    date: "2026-02-19",
    status: "pending" as const,
    receipt: false,
  },
  {
    id: "EXP-005",
    employee: "Aisha Patel",
    category: "Training",
    description: "AWS certification exam fee",
    amount: 350,
    date: "2026-02-18",
    status: "approved" as const,
    receipt: true,
  },
  {
    id: "EXP-006",
    employee: "James Wilson",
    category: "Travel",
    description: "Conference travel - DevSummit 2026",
    amount: 2800,
    date: "2026-02-15",
    status: "rejected" as const,
    receipt: true,
  },
  {
    id: "EXP-007",
    employee: "Li Wei",
    category: "Office Supplies",
    description: "Whiteboard markers and sticky notes",
    amount: 45,
    date: "2026-02-14",
    status: "approved" as const,
    receipt: true,
  },
  {
    id: "EXP-008",
    employee: "Sarah Chen",
    category: "Software",
    description: "JetBrains IDE subscription",
    amount: 290,
    date: "2026-02-12",
    status: "pending" as const,
    receipt: true,
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-400",
  },
  approved: {
    label: "Approved",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-400",
  },
};

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch =
      exp.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? exp.status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? exp.category === categoryFilter
      : true;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage employee expense reports.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Plus className="h-4 w-4" />
            Submit Expense
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Submitted"
          value="$12,400"
          icon={Receipt}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          subtitle="23 expenses this month"
        />
        <StatCard
          title="Approved"
          value="$8,200"
          icon={CheckCircle2}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          subtitle="15 expenses approved"
        />
        <StatCard
          title="Pending"
          value="$4,200"
          icon={Clock}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          subtitle="8 awaiting approval"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="search"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border bg-[var(--background)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
        >
          <option value="">All Categories</option>
          <option value="Travel">Travel</option>
          <option value="Software">Software</option>
          <option value="Equipment">Equipment</option>
          <option value="Meals">Meals</option>
          <option value="Training">Training</option>
          <option value="Office Supplies">Office Supplies</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[var(--muted)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Employee
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Category
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Date
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
              {filteredExpenses.map((expense) => {
                const status = statusConfig[expense.status];
                return (
                  <tr
                    key={expense.id}
                    className="border-b last:border-b-0 hover:bg-[var(--muted)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-xs font-medium text-[var(--color-primary-700)]">
                          {expense.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium">{expense.employee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-lg bg-[var(--muted)] px-2 py-1 text-xs font-medium">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-[240px] truncate">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ${expense.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {expense.date}
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
                        {expense.receipt && (
                          <button
                            className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                            title="View Receipt"
                          >
                            <Receipt className="h-4 w-4 text-[var(--muted-foreground)]" />
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
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  subtitle: string;
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
          <p className="text-xs text-[var(--muted-foreground)]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
