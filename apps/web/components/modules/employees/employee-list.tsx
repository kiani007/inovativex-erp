"use client";

import Link from "next/link";
import { MoreHorizontal, Mail, Phone } from "lucide-react";

const employees = [
  {
    id: "1",
    employeeId: "INX-001",
    name: "Sarah Chen",
    email: "sarah.chen@inovativex.com",
    phone: "+1 (555) 123-4567",
    avatar: "SC",
    designation: "Senior Software Engineer",
    department: "Engineering",
    status: "active",
    joinDate: "Jan 15, 2023",
    type: "Full Time",
  },
  {
    id: "2",
    employeeId: "INX-002",
    name: "Ahmed Khan",
    email: "ahmed.khan@inovativex.com",
    phone: "+1 (555) 234-5678",
    avatar: "AK",
    designation: "Product Manager",
    department: "Product",
    status: "active",
    joinDate: "Mar 01, 2023",
    type: "Full Time",
  },
  {
    id: "3",
    employeeId: "INX-003",
    name: "Maria Santos",
    email: "maria.santos@inovativex.com",
    phone: "+1 (555) 345-6789",
    avatar: "MS",
    designation: "Finance Manager",
    department: "Finance",
    status: "active",
    joinDate: "Feb 10, 2022",
    type: "Full Time",
  },
  {
    id: "4",
    employeeId: "INX-004",
    name: "James Wilson",
    email: "james.wilson@inovativex.com",
    phone: "+1 (555) 456-7890",
    avatar: "JW",
    designation: "DevOps Lead",
    department: "DevOps",
    status: "on_leave",
    joinDate: "Jul 20, 2023",
    type: "Full Time",
  },
  {
    id: "5",
    employeeId: "INX-005",
    name: "Priya Patel",
    email: "priya.patel@inovativex.com",
    phone: "+1 (555) 567-8901",
    avatar: "PP",
    designation: "HR Manager",
    department: "HR & Admin",
    status: "active",
    joinDate: "Sep 05, 2022",
    type: "Full Time",
  },
  {
    id: "6",
    employeeId: "INX-006",
    name: "David Kim",
    email: "david.kim@inovativex.com",
    phone: "+1 (555) 678-9012",
    avatar: "DK",
    designation: "UI/UX Designer",
    department: "Design",
    status: "active",
    joinDate: "Jan 08, 2024",
    type: "Full Time",
  },
  {
    id: "7",
    employeeId: "INX-007",
    name: "Elena Rodriguez",
    email: "elena.rod@inovativex.com",
    phone: "+1 (555) 789-0123",
    avatar: "ER",
    designation: "QA Engineer",
    department: "QA",
    status: "active",
    joinDate: "Apr 15, 2024",
    type: "Contract",
  },
];

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  on_leave: "bg-yellow-100 text-yellow-700",
  terminated: "bg-red-100 text-red-700",
  resigned: "bg-gray-100 text-gray-700",
};

export function EmployeeList() {
  return (
    <div className="rounded-xl border bg-[var(--card)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
              <th className="px-4 py-3 font-medium">Employee</th>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Join Date</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/employees/${emp.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium">
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="font-medium hover:text-[var(--color-primary-600)]">
                        {emp.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {emp.designation}
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">
                  {emp.employeeId}
                </td>
                <td className="px-4 py-3">{emp.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[emp.status]}`}
                  >
                    {emp.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">
                  {emp.type}
                </td>
                <td className="px-4 py-3 text-[var(--muted-foreground)]">
                  {emp.joinDate}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded p-1 hover:bg-[var(--muted)]" title="Send email">
                      <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
                    </button>
                    <button className="rounded p-1 hover:bg-[var(--muted)]" title="More options">
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
          Showing 1-7 of 127 employees
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
  );
}
