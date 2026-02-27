"use client";

import { useState } from "react";
import {
  DollarSign,
  Users,
  TrendingUp,
  Download,
  Play,
  MoreHorizontal,
  FileText,
  Send,
} from "lucide-react";

const payrollStats = [
  {
    label: "Total Payroll",
    value: "$485,000",
    icon: DollarSign,
    color: "bg-emerald-500",
    change: "+3.2%",
    changeType: "positive" as const,
  },
  {
    label: "Total Employees",
    value: "127",
    icon: Users,
    color: "bg-blue-500",
    change: "+4",
    changeType: "positive" as const,
  },
  {
    label: "Avg. Salary",
    value: "$3,819",
    icon: TrendingUp,
    color: "bg-violet-500",
    change: "+1.8%",
    changeType: "positive" as const,
  },
];

const payrollEntries = [
  {
    id: "PAY-001",
    employee: "Sarah Chen",
    avatar: "SC",
    designation: "Senior Software Engineer",
    department: "Engineering",
    basicSalary: 6500,
    allowances: 1200,
    deductions: 350,
    tax: 1480,
    netSalary: 5870,
    status: "paid",
  },
  {
    id: "PAY-002",
    employee: "Ahmed Khan",
    avatar: "AK",
    designation: "Product Manager",
    department: "Product",
    basicSalary: 6000,
    allowances: 1000,
    deductions: 300,
    tax: 1340,
    netSalary: 5360,
    status: "paid",
  },
  {
    id: "PAY-003",
    employee: "Maria Santos",
    avatar: "MS",
    designation: "Finance Manager",
    department: "Finance",
    basicSalary: 5800,
    allowances: 900,
    deductions: 280,
    tax: 1284,
    netSalary: 5136,
    status: "approved",
  },
  {
    id: "PAY-004",
    employee: "James Wilson",
    avatar: "JW",
    designation: "DevOps Lead",
    department: "DevOps",
    basicSalary: 6200,
    allowances: 1100,
    deductions: 320,
    tax: 1396,
    netSalary: 5584,
    status: "processing",
  },
  {
    id: "PAY-005",
    employee: "Priya Patel",
    avatar: "PP",
    designation: "HR Manager",
    department: "HR & Admin",
    basicSalary: 5500,
    allowances: 800,
    deductions: 250,
    tax: 1210,
    netSalary: 4840,
    status: "draft",
  },
  {
    id: "PAY-006",
    employee: "David Kim",
    avatar: "DK",
    designation: "UI/UX Designer",
    department: "Design",
    basicSalary: 5200,
    allowances: 750,
    deductions: 200,
    tax: 1150,
    netSalary: 4600,
    status: "draft",
  },
];

const statusBadge: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  processing: "bg-yellow-100 text-yellow-700",
  approved: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PayrollPage() {
  const [selectedMonth] = useState("February 2026");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-[var(--muted-foreground)]">
            Monthly payroll management for {selectedMonth}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Download All
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Play className="h-4 w-4" />
            Run Payroll
          </button>
        </div>
      </div>

      {/* Payroll Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {payrollStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm">
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-[var(--muted-foreground)]">
                  vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Month Selector */}
      <div className="flex items-center gap-3">
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]">
          <option value="feb-2026">February 2026</option>
          <option value="jan-2026">January 2026</option>
          <option value="dec-2025">December 2025</option>
          <option value="nov-2025">November 2025</option>
        </select>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="product">Product</option>
          <option value="finance">Finance</option>
          <option value="design">Design</option>
          <option value="hr">HR & Admin</option>
          <option value="devops">DevOps</option>
        </select>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="processing">Processing</option>
          <option value="approved">Approved</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Payroll Table */}
      <div className="rounded-xl border bg-[var(--card)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium text-right">
                  Basic Salary
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  Allowances
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  Deductions
                </th>
                <th className="px-4 py-3 font-medium text-right">Tax</th>
                <th className="px-4 py-3 font-medium text-right">
                  Net Salary
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payrollEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium">
                        {entry.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{entry.employee}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {entry.designation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(entry.basicSalary)}
                  </td>
                  <td className="px-4 py-3 text-right text-green-600">
                    +{formatCurrency(entry.allowances)}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600">
                    -{formatCurrency(entry.deductions)}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600">
                    -{formatCurrency(entry.tax)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(entry.netSalary)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusBadge[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        className="rounded p-1 hover:bg-[var(--muted)]"
                        title="View payslip"
                      >
                        <FileText className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </button>
                      <button
                        className="rounded p-1 hover:bg-[var(--muted)]"
                        title="Send payslip"
                      >
                        <Send className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </button>
                      <button
                        className="rounded p-1 hover:bg-[var(--muted)]"
                        title="More options"
                      >
                        <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-[var(--muted-foreground)]">
            Showing 1-6 of 127 employees
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-[var(--muted)]">
              Previous
            </button>
            <button className="rounded-lg bg-[var(--color-primary-600)] px-3 py-1 text-sm text-white">
              1
            </button>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-[var(--muted)]">
              2
            </button>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-[var(--muted)]">
              3
            </button>
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-[var(--muted)]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
