"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  Activity,
  Milestone,
  Settings,
  Columns3,
  Timer,
} from "lucide-react";

type TabKey = "overview" | "board" | "sprints" | "timesheet" | "settings";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "board", label: "Board", icon: Columns3 },
  { key: "sprints", label: "Sprints", icon: Milestone },
  { key: "timesheet", label: "Timesheet", icon: Timer },
  { key: "settings", label: "Settings", icon: Settings },
];

const statCards = [
  {
    label: "Total Tasks",
    value: 45,
    icon: ListTodo,
    color: "bg-blue-100 text-blue-700",
    iconColor: "text-blue-600",
  },
  {
    label: "Completed",
    value: 28,
    icon: CheckCircle2,
    color: "bg-green-100 text-green-700",
    iconColor: "text-green-600",
  },
  {
    label: "In Progress",
    value: 12,
    icon: Clock,
    color: "bg-orange-100 text-orange-700",
    iconColor: "text-orange-600",
  },
  {
    label: "Blocked",
    value: 2,
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700",
    iconColor: "text-red-600",
  },
];

const milestones = [
  {
    name: "Project Kickoff",
    date: "Jan 10, 2026",
    status: "completed" as const,
  },
  {
    name: "Design Approval",
    date: "Feb 05, 2026",
    status: "completed" as const,
  },
  {
    name: "Backend MVP",
    date: "Mar 01, 2026",
    status: "completed" as const,
  },
  {
    name: "Frontend Integration",
    date: "Mar 20, 2026",
    status: "in_progress" as const,
  },
  {
    name: "QA & Testing",
    date: "Apr 10, 2026",
    status: "upcoming" as const,
  },
  {
    name: "Production Launch",
    date: "Apr 30, 2026",
    status: "upcoming" as const,
  },
];

const recentActivity = [
  {
    user: "Sarah Chen",
    initials: "SC",
    action: "completed task",
    target: "Implement user authentication",
    time: "2 hours ago",
  },
  {
    user: "James Lee",
    initials: "JL",
    action: "moved task to Review",
    target: "Product listing API endpoint",
    time: "4 hours ago",
  },
  {
    user: "Priya Sharma",
    initials: "PS",
    action: "commented on",
    target: "Cart checkout flow design",
    time: "5 hours ago",
  },
  {
    user: "Mike Ross",
    initials: "MR",
    action: "created task",
    target: "Set up CI/CD pipeline",
    time: "1 day ago",
  },
  {
    user: "Sarah Chen",
    initials: "SC",
    action: "updated milestone",
    target: "Backend MVP",
    time: "1 day ago",
  },
  {
    user: "James Lee",
    initials: "JL",
    action: "logged 4h on",
    target: "Database schema design",
    time: "2 days ago",
  },
];

const tasksByStatus = [
  { label: "Backlog", count: 8, color: "bg-gray-400" },
  { label: "To Do", count: 5, color: "bg-blue-500" },
  { label: "In Progress", count: 12, color: "bg-orange-500" },
  { label: "Review", count: 7, color: "bg-purple-500" },
  { label: "Done", count: 28, color: "bg-green-500" },
];

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const project = {
    id: params.id,
    name: "E-Commerce Platform Redesign",
    client: "RetailMax Inc.",
    status: "active",
    progress: 68,
    teamCount: 4,
    startDate: "Jan 10, 2026",
    dueDate: "Apr 30, 2026",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <a
          href="/projects"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </a>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                Active
              </span>
            </div>
            <p className="mt-1 text-[var(--muted-foreground)]">
              {project.client}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{project.teamCount} members</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Due {project.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Progress</span>
              <div className="h-2 w-24 rounded-full bg-[var(--muted)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary-600)]"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="font-medium text-[var(--foreground)]">
                {project.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[var(--border)]">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key === "board") {
                    window.location.href = `/projects/${params.id}/board`;
                  } else {
                    setActiveTab(tab.key);
                  }
                }}
                className={`inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-[var(--color-primary-600)] text-[var(--color-primary-600)]"
                    : "border-transparent text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "sprints" && (
        <PlaceholderTab title="Sprints" description="Sprint planning and backlog management will be shown here." />
      )}
      {activeTab === "timesheet" && (
        <PlaceholderTab title="Timesheet" description="Time tracking and logging for this project will be shown here." />
      )}
      {activeTab === "settings" && (
        <PlaceholderTab title="Settings" description="Project configuration and settings will be shown here." />
      )}
    </div>
  );
}

function OverviewTab() {
  const totalTasks = tasksByStatus.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-[var(--card)] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Tasks by Status */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Tasks by Status</h2>
            <div className="mt-4 space-y-3">
              {tasksByStatus.map((status) => {
                const percentage = Math.round(
                  (status.count / totalTasks) * 100
                );
                return (
                  <div key={status.label}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${status.color}`}
                        />
                        <span>{status.label}</span>
                      </div>
                      <span className="text-[var(--muted-foreground)]">
                        {status.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-[var(--muted)]">
                      <div
                        className={`h-full rounded-full ${status.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Timeline */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Milestone Timeline</h2>
            <div className="mt-4 space-y-0">
              {milestones.map((milestone, i) => (
                <div key={milestone.name} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full shrink-0 ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "in_progress"
                          ? "bg-orange-500"
                          : "bg-gray-300"
                      }`}
                    />
                    {i < milestones.length - 1 && (
                      <div className="h-full w-px bg-[var(--border)] min-h-[2rem]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p
                      className={`text-sm font-medium ${
                        milestone.status === "completed"
                          ? "text-[var(--muted-foreground)] line-through"
                          : milestone.status === "in_progress"
                          ? "text-[var(--foreground)]"
                          : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      {milestone.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {milestone.date}
                      </p>
                      {milestone.status === "in_progress" && (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-700">
                          In Progress
                        </span>
                      )}
                      {milestone.status === "completed" && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-medium">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{item.user}</span>{" "}
                      <span className="text-[var(--muted-foreground)]">
                        {item.action}
                      </span>{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-[var(--card)] py-20">
      <div className="h-16 w-16 rounded-2xl bg-[var(--muted)] flex items-center justify-center">
        <ListTodo className="h-8 w-8 text-[var(--muted-foreground)]" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
        {description}
      </p>
    </div>
  );
}
