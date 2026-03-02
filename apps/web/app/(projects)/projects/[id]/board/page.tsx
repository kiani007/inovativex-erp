"use client";

import { use, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Tag,
  User,
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  priority: Priority;
  assignee: { name: string; initials: string };
  storyPoints: number;
  labels: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const priorityConfig: Record<
  Priority,
  { label: string; bg: string; text: string; dot: string }
> = {
  low: {
    label: "Low",
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-400",
  },
  medium: {
    label: "Medium",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  high: {
    label: "High",
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  urgent: {
    label: "Urgent",
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

const columns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      {
        id: "task-01",
        title: "Set up analytics tracking",
        priority: "low",
        assignee: { name: "Mike Ross", initials: "MR" },
        storyPoints: 3,
        labels: ["Analytics"],
      },
      {
        id: "task-02",
        title: "Write API documentation",
        priority: "medium",
        assignee: { name: "James Lee", initials: "JL" },
        storyPoints: 5,
        labels: ["Docs"],
      },
      {
        id: "task-03",
        title: "Implement email notifications",
        priority: "medium",
        assignee: { name: "Priya Sharma", initials: "PS" },
        storyPoints: 8,
        labels: ["Backend", "Notifications"],
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-04",
        title: "Design product detail page",
        priority: "high",
        assignee: { name: "Priya Sharma", initials: "PS" },
        storyPoints: 5,
        labels: ["Design", "UI"],
      },
      {
        id: "task-05",
        title: "Implement search functionality",
        priority: "high",
        assignee: { name: "Sarah Chen", initials: "SC" },
        storyPoints: 8,
        labels: ["Frontend", "Search"],
      },
      {
        id: "task-06",
        title: "Create order management module",
        priority: "medium",
        assignee: { name: "James Lee", initials: "JL" },
        storyPoints: 13,
        labels: ["Backend"],
      },
      {
        id: "task-07",
        title: "Add unit tests for auth module",
        priority: "low",
        assignee: { name: "Mike Ross", initials: "MR" },
        storyPoints: 5,
        labels: ["Testing"],
      },
    ],
  },
  {
    id: "in_progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-08",
        title: "Build shopping cart API",
        priority: "urgent",
        assignee: { name: "Sarah Chen", initials: "SC" },
        storyPoints: 8,
        labels: ["Backend", "API"],
      },
      {
        id: "task-09",
        title: "Implement payment gateway",
        priority: "high",
        assignee: { name: "James Lee", initials: "JL" },
        storyPoints: 13,
        labels: ["Backend", "Payments"],
      },
      {
        id: "task-10",
        title: "Product catalog UI components",
        priority: "medium",
        assignee: { name: "Priya Sharma", initials: "PS" },
        storyPoints: 8,
        labels: ["Frontend", "UI"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "task-11",
        title: "User authentication flow",
        priority: "high",
        assignee: { name: "Sarah Chen", initials: "SC" },
        storyPoints: 8,
        labels: ["Frontend", "Auth"],
      },
      {
        id: "task-12",
        title: "Database schema migration",
        priority: "medium",
        assignee: { name: "Mike Ross", initials: "MR" },
        storyPoints: 5,
        labels: ["Backend", "Database"],
      },
      {
        id: "task-13",
        title: "Product listing API endpoint",
        priority: "medium",
        assignee: { name: "James Lee", initials: "JL" },
        storyPoints: 5,
        labels: ["Backend", "API"],
      },
      {
        id: "task-14",
        title: "Responsive header navigation",
        priority: "low",
        assignee: { name: "Priya Sharma", initials: "PS" },
        storyPoints: 3,
        labels: ["Frontend", "UI"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-15",
        title: "Project boilerplate setup",
        priority: "high",
        assignee: { name: "Sarah Chen", initials: "SC" },
        storyPoints: 5,
        labels: ["DevOps"],
      },
      {
        id: "task-16",
        title: "Design system components",
        priority: "high",
        assignee: { name: "Priya Sharma", initials: "PS" },
        storyPoints: 13,
        labels: ["Design", "UI"],
      },
      {
        id: "task-17",
        title: "CI/CD pipeline configuration",
        priority: "medium",
        assignee: { name: "Mike Ross", initials: "MR" },
        storyPoints: 8,
        labels: ["DevOps"],
      },
    ],
  },
];

const sprints = [
  { id: "sprint-3", name: "Sprint 3 - Mar 10 to Mar 24" },
  { id: "sprint-2", name: "Sprint 2 - Feb 24 to Mar 9" },
  { id: "sprint-1", name: "Sprint 1 - Feb 10 to Feb 23" },
];

const columnColors: Record<string, string> = {
  backlog: "bg-gray-400",
  todo: "bg-blue-500",
  in_progress: "bg-orange-500",
  review: "bg-purple-500",
  done: "bg-green-500",
};

export default function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [selectedSprint, setSelectedSprint] = useState(sprints[0].id);
  const [sprintDropdownOpen, setSprintDropdownOpen] = useState(false);

  const currentSprint = sprints.find((s) => s.id === selectedSprint);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <a
          href={`/projects/${id}`}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project
        </a>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Board</h1>

          {/* Sprint Selector */}
          <div className="relative">
            <button
              onClick={() => setSprintDropdownOpen(!sprintDropdownOpen)}
              className="inline-flex items-center gap-2 rounded-lg border bg-[var(--background)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
            >
              {currentSprint?.name}
              <ChevronDown className="h-4 w-4 text-[var(--muted-foreground)]" />
            </button>
            {sprintDropdownOpen && (
              <div className="absolute right-0 z-10 mt-1 w-72 rounded-lg border bg-[var(--card)] py-1 shadow-lg">
                {sprints.map((sprint) => (
                  <button
                    key={sprint.id}
                    onClick={() => {
                      setSelectedSprint(sprint.id);
                      setSprintDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors ${
                      sprint.id === selectedSprint
                        ? "bg-[var(--muted)] font-medium"
                        : ""
                    }`}
                  >
                    {sprint.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex w-72 shrink-0 flex-col rounded-xl border bg-[var(--muted)]/30"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    columnColors[column.id] || "bg-gray-400"
                  }`}
                />
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--muted)] px-1.5 text-xs font-medium text-[var(--muted-foreground)]">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Task Cards */}
            <div className="flex-1 space-y-2 px-3 pb-3">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const priority = priorityConfig[task.priority];

  return (
    <div className="rounded-lg border bg-[var(--card)] p-3 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
      {/* Labels */}
      <div className="flex flex-wrap gap-1 mb-2">
        {task.labels.map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]"
          >
            <Tag className="h-2.5 w-2.5" />
            {label}
          </span>
        ))}
      </div>

      {/* Title */}
      <p className="text-sm font-medium leading-snug">{task.title}</p>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Priority Badge */}
          <span
            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${priority.bg} ${priority.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>

          {/* Story Points */}
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[var(--muted)] text-[10px] font-bold text-[var(--muted-foreground)]">
            {task.storyPoints}
          </span>
        </div>

        {/* Assignee */}
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[10px] font-medium text-[var(--color-primary-700)]"
          title={task.assignee.name}
        >
          {task.assignee.initials}
        </div>
      </div>
    </div>
  );
}
