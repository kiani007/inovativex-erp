const activities = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "completed task",
    target: "API Authentication Module",
    project: "Client Portal v2",
    time: "5 minutes ago",
    type: "task",
  },
  {
    id: "2",
    user: "Ahmed Khan",
    action: "submitted leave request",
    target: "3 days annual leave",
    project: null,
    time: "15 minutes ago",
    type: "leave",
  },
  {
    id: "3",
    user: "Maria Santos",
    action: "created invoice",
    target: "INV-2026-042",
    project: "Acme Corp",
    time: "1 hour ago",
    type: "finance",
  },
  {
    id: "4",
    user: "James Wilson",
    action: "merged PR",
    target: "#347 - Fix dashboard charts",
    project: "ERP System",
    time: "2 hours ago",
    type: "project",
  },
  {
    id: "5",
    user: "Priya Patel",
    action: "onboarded new employee",
    target: "David Kim",
    project: null,
    time: "3 hours ago",
    type: "hr",
  },
];

const typeColors: Record<string, string> = {
  task: "bg-blue-100 text-blue-700",
  leave: "bg-yellow-100 text-yellow-700",
  finance: "bg-green-100 text-green-700",
  project: "bg-purple-100 text-purple-700",
  hr: "bg-pink-100 text-pink-700",
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-sm text-[var(--color-primary-600)] hover:underline">
          View all
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-sm font-medium">
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}{" "}
                <span className="font-medium">{activity.target}</span>
                {activity.project && (
                  <span className="text-[var(--muted-foreground)]">
                    {" "}
                    in {activity.project}
                  </span>
                )}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {activity.time}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[activity.type]}`}
            >
              {activity.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
