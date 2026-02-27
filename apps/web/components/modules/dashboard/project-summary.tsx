const projects = [
  {
    name: "Client Portal v2",
    client: "Acme Corp",
    status: "active",
    progress: 72,
    team: 8,
    dueDate: "Mar 15, 2026",
  },
  {
    name: "Mobile Banking App",
    client: "FinTech Solutions",
    status: "active",
    progress: 45,
    team: 12,
    dueDate: "Apr 30, 2026",
  },
  {
    name: "AI Dashboard",
    client: "DataViz Inc",
    status: "active",
    progress: 88,
    team: 5,
    dueDate: "Mar 05, 2026",
  },
  {
    name: "E-commerce Platform",
    client: "RetailMax",
    status: "on_hold",
    progress: 35,
    team: 6,
    dueDate: "May 20, 2026",
  },
  {
    name: "Healthcare Portal",
    client: "MedCare",
    status: "active",
    progress: 60,
    team: 10,
    dueDate: "Jun 01, 2026",
  },
];

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  on_hold: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700",
  planning: "bg-gray-100 text-gray-700",
};

export function ProjectSummary() {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Active Projects</h3>
        <button className="text-sm text-[var(--color-primary-600)] hover:underline">
          View all
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Progress</th>
              <th className="pb-3 font-medium">Team</th>
              <th className="pb-3 font-medium">Due Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((project) => (
              <tr key={project.name} className="border-b last:border-0">
                <td className="py-3">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {project.client}
                    </p>
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[project.status]}`}
                  >
                    {project.status.replace("_", " ")}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 rounded-full bg-[var(--muted)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-primary-500)]"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-[var(--muted-foreground)]">
                    {project.team}
                  </span>
                </td>
                <td className="py-3 text-[var(--muted-foreground)]">
                  {project.dueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
