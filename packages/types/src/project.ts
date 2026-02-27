import type { UUID } from "./common";

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";
export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Project = {
  id: UUID;
  name: string;
  description: string | null;
  client_id: UUID | null;
  client_name: string | null;
  status: ProjectStatus;
  start_date: string;
  end_date: string | null;
  budget: number | null;
  spent: number;
  manager_id: UUID;
  manager_name: string;
  team_members: UUID[];
  tags: string[];
  github_repo: string | null;
  created_at: string;
  updated_at: string;
};

export type Sprint = {
  id: UUID;
  project_id: UUID;
  name: string;
  goal: string | null;
  start_date: string;
  end_date: string;
  status: "planning" | "active" | "completed";
  total_points: number;
  completed_points: number;
  created_at: string;
};

export type Task = {
  id: UUID;
  project_id: UUID;
  sprint_id: UUID | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id: UUID | null;
  assignee_name: string | null;
  assignee_avatar: string | null;
  reporter_id: UUID;
  labels: string[];
  story_points: number | null;
  estimated_hours: number | null;
  logged_hours: number;
  due_date: string | null;
  github_pr_url: string | null;
  parent_task_id: UUID | null;
  order: number;
  created_at: string;
  updated_at: string;
};

export type TimeEntry = {
  id: UUID;
  task_id: UUID;
  task_title: string;
  project_id: UUID;
  project_name: string;
  employee_id: UUID;
  date: string;
  hours: number;
  description: string | null;
  is_billable: boolean;
  created_at: string;
};

export type StandupEntry = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  employee_avatar: string | null;
  project_id: UUID;
  date: string;
  yesterday: string;
  today: string;
  blockers: string | null;
  created_at: string;
};

export type Milestone = {
  id: UUID;
  project_id: UUID;
  title: string;
  description: string | null;
  due_date: string;
  status: "pending" | "completed" | "overdue";
  completed_at: string | null;
  created_at: string;
};
