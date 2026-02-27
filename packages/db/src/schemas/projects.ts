import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean, jsonb } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { employees } from "./employees";

export const projectStatusEnum = pgEnum("project_status", [
  "planning", "active", "on_hold", "completed", "cancelled",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "backlog", "todo", "in_progress", "review", "done",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
  "low", "medium", "high", "urgent",
]);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  clientId: uuid("client_id"),
  status: projectStatusEnum("status").notNull().default("planning"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  budget: numeric("budget", { precision: 12, scale: 2 }),
  spent: numeric("spent", { precision: 12, scale: 2 }).notNull().default("0"),
  managerId: uuid("manager_id").notNull().references(() => profiles.id),
  teamMembers: jsonb("team_members").$type<string[]>().default([]),
  tags: jsonb("tags").$type<string[]>().default([]),
  githubRepo: text("github_repo"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sprints = pgTable("sprints", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  name: text("name").notNull(),
  goal: text("goal"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: text("status").notNull().default("planning"),
  totalPoints: integer("total_points").notNull().default(0),
  completedPoints: integer("completed_points").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  sprintId: uuid("sprint_id").references(() => sprints.id),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("backlog"),
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  assigneeId: uuid("assignee_id").references(() => profiles.id),
  reporterId: uuid("reporter_id").notNull().references(() => profiles.id),
  labels: jsonb("labels").$type<string[]>().default([]),
  storyPoints: integer("story_points"),
  estimatedHours: numeric("estimated_hours", { precision: 6, scale: 2 }),
  loggedHours: numeric("logged_hours", { precision: 6, scale: 2 }).notNull().default("0"),
  dueDate: date("due_date"),
  githubPrUrl: text("github_pr_url"),
  parentTaskId: uuid("parent_task_id"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const timeEntries = pgTable("time_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: uuid("task_id").notNull().references(() => tasks.id),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  date: date("date").notNull(),
  hours: numeric("hours", { precision: 4, scale: 2 }).notNull(),
  description: text("description"),
  isBillable: boolean("is_billable").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const standupEntries = pgTable("standup_entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  date: date("date").notNull(),
  yesterday: text("yesterday").notNull(),
  today: text("today").notNull(),
  blockers: text("blockers"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const milestones = pgTable("milestones", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: date("due_date").notNull(),
  status: text("status").notNull().default("pending"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
