"use client";

import {
  Plus,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Building2,
  FolderKanban,
} from "lucide-react";

const budgets = [
  {
    id: "BUD-001",
    name: "Mobile App Redesign",
    type: "project" as const,
    total: 150000,
    spent: 128500,
    owner: "Sarah Chen",
    period: "Q1 2026",
  },
  {
    id: "BUD-002",
    name: "Engineering Department",
    type: "department" as const,
    total: 500000,
    spent: 312000,
    owner: "Alex Thompson",
    period: "FY 2026",
  },
  {
    id: "BUD-003",
    name: "Marketing Campaign - Q1",
    type: "project" as const,
    total: 75000,
    spent: 62400,
    owner: "Emily Rodriguez",
    period: "Q1 2026",
  },
  {
    id: "BUD-004",
    name: "HR & Operations",
    type: "department" as const,
    total: 200000,
    spent: 98000,
    owner: "Aisha Patel",
    period: "FY 2026",
  },
];

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-[var(--muted-foreground)]">
            Track project and department budgets.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Create Budget
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Total Allocated
              </p>
              <p className="text-2xl font-bold">$925K</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Total Spent
              </p>
              <p className="text-2xl font-bold">$600.9K</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Over 80% Used
              </p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}

function BudgetCard({
  budget,
}: {
  budget: {
    id: string;
    name: string;
    type: "project" | "department";
    total: number;
    spent: number;
    owner: string;
    period: string;
  };
}) {
  const remaining = budget.total - budget.spent;
  const percentage = Math.round((budget.spent / budget.total) * 100);
  const isOverThreshold = percentage >= 80;

  const progressColor =
    percentage >= 90
      ? "bg-red-500"
      : percentage >= 80
        ? "bg-orange-500"
        : "bg-green-500";

  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              budget.type === "project"
                ? "bg-purple-100"
                : "bg-blue-100"
            }`}
          >
            {budget.type === "project" ? (
              <FolderKanban
                className={`h-5 w-5 ${
                  budget.type === "project"
                    ? "text-purple-600"
                    : "text-blue-600"
                }`}
              />
            ) : (
              <Building2 className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{budget.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              {budget.type === "project" ? "Project" : "Department"} &bull;{" "}
              {budget.period}
            </p>
          </div>
        </div>
        {isOverThreshold && (
          <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
            <AlertTriangle className="h-3 w-3" />
            {percentage >= 90 ? "Critical" : "Warning"}
          </div>
        )}
      </div>

      {/* Budget Amounts */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Total Budget</p>
          <p className="text-lg font-bold">
            ${(budget.total / 1000).toFixed(0)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Spent</p>
          <p className="text-lg font-bold">
            ${(budget.spent / 1000).toFixed(1)}K
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Remaining</p>
          <p
            className={`text-lg font-bold ${
              remaining < 0 ? "text-red-600" : ""
            }`}
          >
            ${(remaining / 1000).toFixed(1)}K
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Budget used</span>
          <span
            className={`font-medium ${
              isOverThreshold ? "text-orange-600" : ""
            }`}
          >
            {percentage}%
          </span>
        </div>
        <div className="mt-1.5 h-2.5 rounded-full bg-[var(--muted)]">
          <div
            className={`h-full rounded-full ${progressColor} transition-all`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          Owner: {budget.owner}
        </p>
        <button className="text-xs font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
