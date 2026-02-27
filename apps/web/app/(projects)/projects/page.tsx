"use client";

import { useState } from "react";
import {
  Plus,
  LayoutGrid,
  List,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";

type ProjectStatus = "planning" | "active" | "on_hold" | "completed";

interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  team: { name: string; initials: string }[];
  budget: string;
  dueDate: string;
  description: string;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; bg: string; text: string }
> = {
  planning: {
    label: "Planning",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  active: {
    label: "Active",
    bg: "bg-green-100",
    text: "text-green-700",
  },
  on_hold: {
    label: "On Hold",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

const projects: Project[] = [
  {
    id: "proj-001",
    name: "E-Commerce Platform Redesign",
    client: "RetailMax Inc.",
    status: "active",
    progress: 68,
    team: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "James Lee", initials: "JL" },
      { name: "Priya Sharma", initials: "PS" },
      { name: "Mike Ross", initials: "MR" },
    ],
    budget: "$120,000",
    dueDate: "Mar 15, 2026",
    description: "Complete redesign of the e-commerce platform with modern UI/UX",
  },
  {
    id: "proj-002",
    name: "Mobile Banking App",
    client: "FinanceFirst Bank",
    status: "active",
    progress: 42,
    team: [
      { name: "Alex Thompson", initials: "AT" },
      { name: "Nina Patel", initials: "NP" },
      { name: "Carlos Ruiz", initials: "CR" },
    ],
    budget: "$250,000",
    dueDate: "Jun 30, 2026",
    description: "Native mobile banking application for iOS and Android",
  },
  {
    id: "proj-003",
    name: "HR Management System",
    client: "TechCorp Solutions",
    status: "planning",
    progress: 12,
    team: [
      { name: "Emily Wang", initials: "EW" },
      { name: "David Kim", initials: "DK" },
    ],
    budget: "$85,000",
    dueDate: "Aug 20, 2026",
    description: "Comprehensive HR management and payroll system",
  },
  {
    id: "proj-004",
    name: "Supply Chain Dashboard",
    client: "LogiFlow Ltd.",
    status: "completed",
    progress: 100,
    team: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Tom Baker", initials: "TB" },
      { name: "Lisa Park", initials: "LP" },
    ],
    budget: "$95,000",
    dueDate: "Jan 10, 2026",
    description: "Real-time supply chain analytics and monitoring dashboard",
  },
  {
    id: "proj-005",
    name: "Patient Portal",
    client: "MediCare Group",
    status: "on_hold",
    progress: 35,
    team: [
      { name: "James Lee", initials: "JL" },
      { name: "Rachel Green", initials: "RG" },
      { name: "Omar Hassan", initials: "OH" },
      { name: "Nina Patel", initials: "NP" },
      { name: "Carlos Ruiz", initials: "CR" },
    ],
    budget: "$180,000",
    dueDate: "May 01, 2026",
    description: "Patient-facing portal for appointments and medical records",
  },
  {
    id: "proj-006",
    name: "Inventory Management API",
    client: "WareHouse Pro",
    status: "active",
    progress: 55,
    team: [
      { name: "David Kim", initials: "DK" },
      { name: "Alex Thompson", initials: "AT" },
    ],
    budget: "$65,000",
    dueDate: "Apr 18, 2026",
    description: "RESTful API for warehouse inventory tracking and management",
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage all your projects in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center rounded-lg border">
            <button
              onClick={() => setView("grid")}
              className={`inline-flex items-center gap-1 rounded-l-lg px-3 py-2 text-sm font-medium transition-colors ${
                view === "grid"
                  ? "bg-[var(--muted)] text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1 rounded-r-lg px-3 py-2 text-sm font-medium transition-colors ${
                view === "list"
                  ? "bg-[var(--muted)] text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Project Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <a
      href={`/projects/${project.id}`}
      className="block rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold truncate">{project.name}</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {project.client}
          </p>
        </div>
        <span
          className={`ml-2 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-[var(--muted)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary-600)] transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Team Avatars */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((member) => (
            <div
              key={member.initials}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] text-xs font-medium"
              title={member.name}
            >
              {member.initials}
            </div>
          ))}
          {project.team.length > 4 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] text-xs font-medium text-[var(--muted-foreground)]">
              +{project.team.length - 4}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
          <Users className="h-3.5 w-3.5" />
          {project.team.length}
        </div>
      </div>

      {/* Budget & Due Date */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm">
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          <DollarSign className="h-3.5 w-3.5" />
          <span>{project.budget}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          <Calendar className="h-3.5 w-3.5" />
          <span>{project.dueDate}</span>
        </div>
      </div>
    </a>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  const status = statusConfig[project.status];

  return (
    <a
      href={`/projects/${project.id}`}
      className="flex items-center gap-6 rounded-xl border bg-[var(--card)] px-6 py-4 transition-shadow hover:shadow-md"
    >
      {/* Name & Client */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">{project.name}</h3>
        <p className="text-xs text-[var(--muted-foreground)]">
          {project.client}
        </p>
      </div>

      {/* Status */}
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
      >
        {status.label}
      </span>

      {/* Progress */}
      <div className="w-32 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--muted-foreground)]">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-[var(--muted)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary-600)]"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Team */}
      <div className="flex -space-x-2 shrink-0">
        {project.team.slice(0, 3).map((member) => (
          <div
            key={member.initials}
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] text-[10px] font-medium"
            title={member.name}
          >
            {member.initials}
          </div>
        ))}
        {project.team.length > 3 && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--muted)] text-[10px] font-medium text-[var(--muted-foreground)]">
            +{project.team.length - 3}
          </div>
        )}
      </div>

      {/* Budget */}
      <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] shrink-0 w-24">
        <DollarSign className="h-3.5 w-3.5" />
        {project.budget}
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] shrink-0 w-28">
        <Calendar className="h-3.5 w-3.5" />
        {project.dueDate}
      </div>
    </a>
  );
}
