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
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

type Profile = {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  department_id: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  departments: { name: string } | null;
};

type Department = {
  id: string;
  name: string;
};

const roleConfig: Record<string, { label: string; bg: string; text: string }> = {
  admin: { label: "Admin", bg: "bg-red-100", text: "text-red-700" },
  hr_manager: { label: "HR Manager", bg: "bg-purple-100", text: "text-purple-700" },
  project_manager: { label: "Project Manager", bg: "bg-blue-100", text: "text-blue-700" },
  team_lead: { label: "Team Lead", bg: "bg-indigo-100", text: "text-indigo-700" },
  employee: { label: "Employee", bg: "bg-gray-100", text: "text-gray-700" },
  viewer: { label: "Viewer", bg: "bg-slate-100", text: "text-slate-700" },
};

const statusConfig = {
  active: { label: "Active", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-400" },
  inactive: { label: "Inactive", bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      // Network error — leave users empty
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data } = await supabase
        .from("departments")
        .select("id, name")
        .order("name");
      if (data) setDepartments(data);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, [fetchUsers, fetchDepartments]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const activeCount = users.filter((u) => u.is_active).length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const inactiveCount = users.filter((u) => !u.is_active).length;

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
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors"
        >
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
              <p className="text-xs text-[var(--muted-foreground)]">Total Users</p>
              <p className="text-xl font-bold">{users.length}</p>
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
              <p className="text-xl font-bold">{activeCount}</p>
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
              <p className="text-xl font-bold">{adminCount}</p>
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
              <p className="text-xl font-bold">{inactiveCount}</p>
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
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">User</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Email</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Role</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Department</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Last Login</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--muted-foreground)]">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--muted-foreground)]">
                    {users.length === 0
                      ? "No users yet. Click \"Add User\" to create the first user."
                      : "No users match your search."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const role = roleConfig[user.role] || roleConfig.employee;
                  const status = user.is_active ? statusConfig.active : statusConfig.inactive;
                  const deptName = user.departments?.name || "—";
                  return (
                    <tr
                      key={user.id}
                      className="border-b last:border-b-0 hover:bg-[var(--muted)] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-xs font-medium text-[var(--color-primary-700)]">
                            {getInitials(user.full_name)}
                          </div>
                          <span className="font-medium">{user.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${role.bg} ${role.text}`}>
                          {role.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">{deptName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">
                        {user.last_login
                          ? new Date(user.last_login).toLocaleString()
                          : "Never"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors" title="View">
                            <Eye className="h-4 w-4 text-[var(--muted-foreground)]" />
                          </button>
                          <button className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors" title="Edit">
                            <Edit className="h-4 w-4 text-[var(--muted-foreground)]" />
                          </button>
                          <button className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors" title="More">
                            <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          departments={departments}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}

function AddUserModal({
  departments,
  onClose,
  onSuccess,
}: {
  departments: Department[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "employee",
    department_id: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          department_id: form.department_id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create user");
        setSubmitting(false);
        return;
      }

      setCreated(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-[var(--card)] p-6 shadow-2xl border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">
            {created ? "User Created" : "Add New User"}
          </h2>
          <button
            onClick={created ? onSuccess : onClose}
            className="rounded-lg p-1.5 hover:bg-[var(--muted)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {created ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-medium text-green-800">
                User account created successfully!
              </p>
              <p className="mt-1 text-sm text-green-700">
                Share these credentials with the employee:
              </p>
            </div>
            <div className="rounded-lg bg-[var(--muted)] p-4 space-y-2">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Email</p>
                <p className="text-sm font-mono font-medium">{form.email}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Password</p>
                <p className="text-sm font-mono font-medium">{form.password}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              The employee should change their password after first login.
            </p>
            <button
              onClick={onSuccess}
              className="w-full rounded-lg bg-[var(--color-primary-600)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                placeholder="john@inovativex.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="text"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-sm font-mono outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
                placeholder="Minimum 8 characters"
              />
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                This is visible so you can share it with the employee.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-sm outline-none"
                >
                  <option value="employee">Employee</option>
                  <option value="viewer">Viewer</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="hr_manager">HR Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select
                  value={form.department_id}
                  onChange={(e) => setForm({ ...form, department_id: e.target.value })}
                  className="w-full rounded-lg border bg-[var(--background)] px-3 py-2 text-sm outline-none"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] disabled:opacity-50 transition-colors"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
