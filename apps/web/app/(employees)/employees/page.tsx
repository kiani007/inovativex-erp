import { Suspense } from "react";
import { EmployeeList } from "@/components/modules/employees/employee-list";
import { Plus, Download, Upload, Filter } from "lucide-react";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage your team members and their information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <input
            type="search"
            placeholder="Search employees..."
            className="h-9 w-full rounded-lg border bg-[var(--background)] pl-3 pr-4 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
          />
        </div>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="product">Product</option>
          <option value="qa">QA</option>
          <option value="devops">DevOps</option>
          <option value="hr">HR & Admin</option>
          <option value="sales">Sales & Marketing</option>
          <option value="finance">Finance</option>
        </select>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="terminated">Terminated</option>
        </select>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Types</option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="intern">Intern</option>
        </select>
      </div>

      {/* Employee List */}
      <Suspense
        fallback={
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-lg bg-[var(--muted)]"
              />
            ))}
          </div>
        }
      >
        <EmployeeList />
      </Suspense>
    </div>
  );
}
