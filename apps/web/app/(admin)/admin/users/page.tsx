"use client";

import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: "USR-001",
    name: "Alex Thompson",
    email: "alex.thompson@inovativex.com",
    role: "admin" as const,
    department: "Engineering",
    status: "active" as const,
    lastLogin: "2026-02-27 09:14 AM",
    avatar: "AT",
  },
  {
    id: "USR-002",
    name: "Aisha Patel",
    email: "aisha.patel@inovativex.com",
    role: "hr_manager" as const,
    department: "Human Resources",
    status: "active" as const,
    lastLogin: "2026-02-27 08:45 AM",
    avatar: "AP",
  },
  {
    id: "USR-003",
    name: "Sarah Chen",
    email: "sarah.chen@inovativex.com",
    role: "project_manager" as const,
    department: "Engineering",
    status: "active" as const,
    lastLogin: "2026-02-26 06:30 PM",
    avatar: "SC",
  },
  {
    id: "USR-004",
    name: "Marcus Johnson",
    email: "marcus.johnson@inovativex.com",
    role: "team_lead" as const,
    department: "Design",
    status: "active" as const,
    lastLogin: "2026-02-27 10:02 AM",
    avatar: "MJ",
  },
  {
    id: "USR-005",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@inovativex.com",
    role: "employee" as const,
    department: "Marketing",
    status: "active" as const,
    lastLogin: "2026-02-26 05:15 PM",
    avatar: "ER",
  },
  {
    id: "USR-006",
    name: "David Kim",
    email: "david.kim@inovativex.com",
    role: "employee" as const,
    department: "Engineering",
    status: "inactive" as const,
    lastLogin: "2026-02-10 11:30 AM",
    avatar: "DK",
  },
  {
    id: "USR-007",
    name: "Li Wei",
    email: "li.wei@inovativex.com",
    role: "viewer" as const,
    department: "Finance",
    status: "active" as const,
    lastLogin: "2026-02-27 07:55 AM",
    avatar: "LW",
  },
  {
    id: "USR-008",
    name: "James Wilson",
    email: "james.wilson@inovativex.com",
    role: "project_manager" as const,
    department: "Product",
    status: "active" as const,
    lastLogin: "2026-02-25 04:40 PM",
    avatar: "JW",
  },
];

const roleConfig = {
  admin: {
    label: "Admin",
    bg: "bg-red-100",
    text: "text-red-700",
  },
  hr_manager: {
    label: "HR Manager",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  project_manager: {
    label: "Project Manager",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  team_lead: {
    label: "Team Lead",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  employee: {
    label: "Employee",
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
  viewer: {
    label: "Viewer",
    bg: "bg-slate-100",
    text: "text-slate-700",
  },
};

const statusConfig = {
  active: {
    label: "Active",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  inactive: {
    label: "Inactive",
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-400",
  },
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage system users, roles, and access permissions.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-[var(--card)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">
                Total Users
              </p>
              <p className="text-xl font-bold">
                {users.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Active</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Admins</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <UserX className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Inactive</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.status === "inactive").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border bg-[var(--background)] pl-9 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="hr_manager">HR Manager</option>
          <option value="project_manager">Project Manager</option>
          <option value="team_lead">Team Lead</option>
          <option value="employee">Employee</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-[var(--card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-[var(--muted)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  User
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Department
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Last Login
                </th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const role = roleConfig[user.role];
                const status = statusConfig[user.status];
                return (
                  <tr
                    key={user.id}
                    className="border-b last:border-b-0 hover:bg-[var(--muted)] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-xs font-medium text-[var(--color-primary-700)]">
                          {user.avatar}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${role.bg} ${role.text}`}
                      >
                        {role.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.department}</td>
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
                    <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">
                      {user.lastLogin}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
                        <button
                          className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4 text-[var(--muted-foreground)]" />
                        </button>
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
