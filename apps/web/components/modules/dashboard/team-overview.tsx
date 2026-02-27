const departments = [
  { name: "Engineering", count: 48, color: "bg-blue-500" },
  { name: "Design", count: 12, color: "bg-purple-500" },
  { name: "Product", count: 8, color: "bg-emerald-500" },
  { name: "QA", count: 15, color: "bg-orange-500" },
  { name: "DevOps", count: 10, color: "bg-cyan-500" },
  { name: "HR & Admin", count: 8, color: "bg-pink-500" },
  { name: "Sales & Marketing", count: 14, color: "bg-amber-500" },
  { name: "Finance", count: 6, color: "bg-green-500" },
  { name: "Management", count: 6, color: "bg-indigo-500" },
];

const total = departments.reduce((sum, d) => sum + d.count, 0);

export function TeamOverview() {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Team Overview</h3>
        <span className="text-sm text-[var(--muted-foreground)]">
          {total} total
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {departments.map((dept) => (
          <div key={dept.name} className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full ${dept.color}`} />
            <span className="flex-1 text-sm">{dept.name}</span>
            <span className="text-sm font-medium">{dept.count}</span>
            <div className="h-1.5 w-16 rounded-full bg-[var(--muted)]">
              <div
                className={`h-full rounded-full ${dept.color}`}
                style={{ width: `${(dept.count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
