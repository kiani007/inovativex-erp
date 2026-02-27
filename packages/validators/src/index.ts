import { z } from "zod";

// ============================================================
// Auth Validators
// ============================================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(2, "Name must be at least 2 characters"),
});

// ============================================================
// Employee Validators
// ============================================================

export const createEmployeeSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  department_id: z.string().uuid("Invalid department"),
  designation: z.string().min(1, "Designation is required"),
  role: z.enum(["admin", "hr_manager", "project_manager", "team_lead", "employee", "viewer"]),
  employment_type: z.enum(["full_time", "part_time", "contract", "intern"]),
  join_date: z.string().date("Invalid date"),
  manager_id: z.string().uuid().optional().nullable(),
  date_of_birth: z.string().date().optional().nullable(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  skills: z.array(z.string()).default([]),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

// ============================================================
// Leave Validators
// ============================================================

export const createLeaveRequestSchema = z.object({
  leave_type: z.enum(["annual", "sick", "casual", "maternity", "paternity", "wfh", "unpaid"]),
  start_date: z.string().date("Invalid start date"),
  end_date: z.string().date("Invalid end date"),
  reason: z.string().min(5, "Please provide a reason (min 5 characters)"),
}).refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
  message: "End date must be on or after start date",
  path: ["end_date"],
});

export const approveLeaveSchema = z.object({
  leave_id: z.string().uuid(),
  action: z.enum(["approve", "reject"]),
  reason: z.string().optional(),
});

// ============================================================
// Attendance Validators
// ============================================================

export const clockInSchema = z.object({
  location: z.enum(["office", "remote"]).optional(),
  notes: z.string().optional(),
});

// ============================================================
// Project Validators
// ============================================================

export const createProjectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().optional().nullable(),
  client_id: z.string().uuid().optional().nullable(),
  start_date: z.string().date("Invalid start date"),
  end_date: z.string().date().optional().nullable(),
  budget: z.number().positive().optional().nullable(),
  manager_id: z.string().uuid("Invalid manager"),
  team_members: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  github_repo: z.string().url().optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createTaskSchema = z.object({
  project_id: z.string().uuid(),
  sprint_id: z.string().uuid().optional().nullable(),
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional().nullable(),
  status: z.enum(["backlog", "todo", "in_progress", "review", "done"]).default("backlog"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  assignee_id: z.string().uuid().optional().nullable(),
  labels: z.array(z.string()).default([]),
  story_points: z.number().int().positive().optional().nullable(),
  estimated_hours: z.number().positive().optional().nullable(),
  due_date: z.string().date().optional().nullable(),
  parent_task_id: z.string().uuid().optional().nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();

export const createSprintSchema = z.object({
  project_id: z.string().uuid(),
  name: z.string().min(1, "Sprint name is required"),
  goal: z.string().optional().nullable(),
  start_date: z.string().date("Invalid start date"),
  end_date: z.string().date("Invalid end date"),
});

export const logTimeSchema = z.object({
  task_id: z.string().uuid(),
  date: z.string().date(),
  hours: z.number().positive().max(24, "Cannot log more than 24 hours"),
  description: z.string().optional().nullable(),
  is_billable: z.boolean().default(true),
});

// ============================================================
// Client Validators
// ============================================================

export const createClientSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  industry: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  account_manager_id: z.string().uuid().optional().nullable(),
});

export const updateClientSchema = createClientSchema.partial();

export const createDealSchema = z.object({
  title: z.string().min(2, "Deal title is required"),
  client_id: z.string().uuid(),
  stage: z.enum(["lead", "proposal", "negotiation", "won", "lost"]).default("lead"),
  value: z.number().positive("Deal value must be positive"),
  currency: z.string().default("USD"),
  probability: z.number().min(0).max(100).default(0),
  expected_close_date: z.string().date().optional().nullable(),
  description: z.string().optional().nullable(),
});

// ============================================================
// Finance Validators
// ============================================================

export const createInvoiceSchema = z.object({
  client_id: z.string().uuid(),
  project_id: z.string().uuid().optional().nullable(),
  issue_date: z.string().date(),
  due_date: z.string().date(),
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit_price: z.number().positive(),
  })).min(1, "At least one line item is required"),
  tax_rate: z.number().min(0).max(100).default(0),
  discount: z.number().min(0).default(0),
  currency: z.string().default("USD"),
  notes: z.string().optional().nullable(),
  payment_terms: z.string().optional().nullable(),
});

export const createExpenseSchema = z.object({
  category: z.enum(["travel", "meals", "software", "hardware", "office", "training", "other"]),
  description: z.string().min(2, "Description is required"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("USD"),
  date: z.string().date(),
  project_id: z.string().uuid().optional().nullable(),
});

// ============================================================
// Asset Validators
// ============================================================

export const createAssetSchema = z.object({
  name: z.string().min(2, "Asset name is required"),
  category: z.enum(["laptop", "monitor", "keyboard", "mouse", "phone", "headset", "desk", "chair", "other"]),
  brand: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  serial_number: z.string().optional().nullable(),
  purchase_date: z.string().date().optional().nullable(),
  purchase_price: z.number().positive().optional().nullable(),
  warranty_expiry: z.string().date().optional().nullable(),
  condition: z.enum(["new", "good", "fair", "poor"]).default("new"),
  location: z.string().optional().nullable(),
});

export const createAssetRequestSchema = z.object({
  asset_type: z.string().min(1, "Asset type is required"),
  description: z.string().min(5, "Please describe what you need"),
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

// ============================================================
// Recruitment Validators
// ============================================================

export const createJobPostingSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  department_id: z.string().uuid(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  requirements: z.array(z.string()).min(1, "At least one requirement"),
  nice_to_have: z.array(z.string()).default([]),
  employment_type: z.enum(["full_time", "part_time", "contract", "intern"]),
  experience_level: z.enum(["junior", "mid", "senior", "lead", "principal"]),
  salary_range_min: z.number().positive().optional().nullable(),
  salary_range_max: z.number().positive().optional().nullable(),
  currency: z.string().default("USD"),
  location: z.enum(["office", "remote", "hybrid"]),
  hiring_manager_id: z.string().uuid(),
});

export const submitReferralSchema = z.object({
  candidate_name: z.string().min(2, "Candidate name is required"),
  candidate_email: z.string().email("Invalid email"),
  job_id: z.string().uuid(),
});

// ============================================================
// Admin Validators
// ============================================================

export const createUserSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2),
  role: z.enum(["admin", "hr_manager", "project_manager", "team_lead", "employee", "viewer"]),
  department_id: z.string().uuid().optional().nullable(),
  send_invite: z.boolean().default(true),
});

export const updateSettingsSchema = z.object({
  company_name: z.string().min(1).optional(),
  company_logo: z.string().url().optional(),
  timezone: z.string().optional(),
  date_format: z.string().optional(),
  currency: z.string().optional(),
  fiscal_year_start: z.number().min(1).max(12).optional(),
  working_days: z.array(z.number().min(0).max(6)).optional(),
  working_hours_start: z.string().optional(),
  working_hours_end: z.string().optional(),
});

// ============================================================
// Standup Validators
// ============================================================

export const submitStandupSchema = z.object({
  project_id: z.string().uuid(),
  yesterday: z.string().min(5, "Please describe yesterday's work"),
  today: z.string().min(5, "Please describe today's plan"),
  blockers: z.string().optional().nullable(),
});

// Export all schema types
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type CreateLeaveRequestInput = z.infer<typeof createLeaveRequestSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type CreateDealInput = z.infer<typeof createDealSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type CreateJobPostingInput = z.infer<typeof createJobPostingSchema>;
export type SubmitStandupInput = z.infer<typeof submitStandupSchema>;
