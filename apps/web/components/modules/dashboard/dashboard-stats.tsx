import { Users, FolderKanban, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  {
    name: "Total Employees",
    value: "127",
    change: "+4",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-blue-500",
  },
  {
    name: "Active Projects",
    value: "18",
    change: "+2",
    changeType: "positive" as const,
    icon: FolderKanban,
    color: "bg-emerald-500",
  },
  {
    name: "Monthly Revenue",
    value: "$284K",
    change: "+12%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "bg-violet-500",
  },
  {
    name: "Team Utilization",
    value: "87%",
    change: "+3%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "bg-amber-500",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {stat.name}
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
  );
}
