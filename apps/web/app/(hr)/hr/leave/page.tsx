"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Palmtree,
  Thermometer,
  Coffee,
  Laptop,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";

const leaveBalances = [
  {
    type: "Annual",
    used: 8,
    total: 20,
    remaining: 12,
    icon: Palmtree,
    color: "bg-blue-500",
    bgLight: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    type: "Sick",
    used: 2,
    total: 10,
    remaining: 8,
    icon: Thermometer,
    color: "bg-red-500",
    bgLight: "bg-red-50",
    textColor: "text-red-700",
  },
  {
    type: "Casual",
    used: 2,
    total: 5,
    remaining: 3,
    icon: Coffee,
    color: "bg-orange-500",
    bgLight: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    type: "WFH",
    used: 6,
    total: 24,
    remaining: 18,
    icon: Laptop,
    color: "bg-purple-500",
    bgLight: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

const leaveRequests = [
  {
    id: "LR-001",
    employee: "Sarah Chen",
    avatar: "SC",
    department: "Engineering",
    type: "Annual",
    startDate: "Mar 3, 2026",
    endDate: "Mar 5, 2026",
    days: 3,
    reason: "Family vacation",
    status: "pending",
    appliedOn: "Feb 24, 2026",
  },
  {
    id: "LR-002",
    employee: "Ahmed Khan",
    avatar: "AK",
    department: "Product",
    type: "Sick",
    startDate: "Feb 26, 2026",
    endDate: "Feb 26, 2026",
    days: 1,
    reason: "Not feeling well",
    status: "approved",
    appliedOn: "Feb 26, 2026",
  },
  {
    id: "LR-003",
    employee: "Maria Santos",
    avatar: "MS",
    department: "Finance",
    type: "WFH",
    startDate: "Feb 27, 2026",
    endDate: "Feb 28, 2026",
    days: 2,
    reason: "Plumbing work at home",
    status: "approved",
    appliedOn: "Feb 25, 2026",
  },
  {
    id: "LR-004",
    employee: "James Wilson",
    avatar: "JW",
    department: "DevOps",
    type: "Annual",
    startDate: "Mar 10, 2026",
    endDate: "Mar 14, 2026",
    days: 5,
    reason: "International travel",
    status: "pending",
    appliedOn: "Feb 22, 2026",
  },
  {
    id: "LR-005",
    employee: "Priya Patel",
    avatar: "PP",
    department: "HR & Admin",
    type: "Casual",
    startDate: "Feb 20, 2026",
    endDate: "Feb 20, 2026",
    days: 1,
    reason: "Personal errand",
    status: "rejected",
    appliedOn: "Feb 18, 2026",
  },
  {
    id: "LR-006",
    employee: "David Kim",
    avatar: "DK",
    department: "Design",
    type: "Annual",
    startDate: "Feb 14, 2026",
    endDate: "Feb 14, 2026",
    days: 1,
    reason: "Moving to new apartment",
    status: "cancelled",
    appliedOn: "Feb 10, 2026",
  },
];

const statusBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
};

const tabs = ["My Requests", "Team Calendar", "All Requests"];

export default function LeaveManagementPage() {
  const [activeTab, setActiveTab] = useState("My Requests");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage leave requests for your team.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Apply for Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leaveBalances.map((leave) => {
          const Icon = leave.icon;
          const percentage = (leave.used / leave.total) * 100;
          return (
            <div
              key={leave.type}
              className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {leave.type} Leave
                  </p>
                  <p className="mt-1 text-3xl font-bold">
                    {leave.remaining}
                    <span className="text-lg font-normal text-[var(--muted-foreground)]">
                      /{leave.total}
                    </span>
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${leave.color} text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                  <span>{leave.used} used</span>
                  <span>{leave.remaining} remaining</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-[var(--muted)]">
                  <div
                    className={`h-full rounded-full ${leave.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-[var(--color-primary-600)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab}
              {tab === "All Requests" && (
                <span className="ml-1 text-xs text-[var(--muted-foreground)]">
                  (admin)
                </span>
              )}
              {activeTab === tab && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-primary-600)]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Leave Requests Table */}
      <div className="rounded-xl border bg-[var(--card)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                <th className="px-4 py-3 font-medium">Employee</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Days</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {leaveRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium">
                        {request.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{request.employee}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {request.department}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{request.type}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                      <span>
                        {request.startDate}
                        {request.startDate !== request.endDate &&
                          ` - ${request.endDate}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium">{request.days}</span>
                    <span className="text-[var(--muted-foreground)]">
                      {request.days === 1 ? " day" : " days"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusBadge[request.status]}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {request.status === "pending" ? (
                      <div className="flex items-center gap-1">
                        <button
                          className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-100 transition-colors"
                          title="Approve"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Approve
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors"
                          title="Reject"
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        className="rounded p-1 hover:bg-[var(--muted)]"
                        title="More options"
                      >
                        <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-[var(--muted-foreground)]">
            Showing 1-6 of 24 requests
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
