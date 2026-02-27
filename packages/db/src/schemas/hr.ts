import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { employees } from "./employees";

export const leaveTypeEnum = pgEnum("leave_type", [
  "annual", "sick", "casual", "maternity", "paternity", "wfh", "unpaid",
]);

export const leaveStatusEnum = pgEnum("leave_status", [
  "pending", "approved", "rejected", "cancelled",
]);

export const leaveRequests = pgTable("leave_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  leaveType: leaveTypeEnum("leave_type").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  days: integer("days").notNull(),
  reason: text("reason").notNull(),
  status: leaveStatusEnum("status").notNull().default("pending"),
  approvedBy: uuid("approved_by").references(() => profiles.id),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const leaveBalances = pgTable("leave_balances", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  year: integer("year").notNull(),
  annualTotal: integer("annual_total").notNull().default(20),
  annualUsed: integer("annual_used").notNull().default(0),
  sickTotal: integer("sick_total").notNull().default(10),
  sickUsed: integer("sick_used").notNull().default(0),
  casualTotal: integer("casual_total").notNull().default(5),
  casualUsed: integer("casual_used").notNull().default(0),
  wfhTotal: integer("wfh_total").notNull().default(24),
  wfhUsed: integer("wfh_used").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const attendanceRecords = pgTable("attendance_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  date: date("date").notNull(),
  clockIn: timestamp("clock_in", { withTimezone: true }),
  clockOut: timestamp("clock_out", { withTimezone: true }),
  totalHours: numeric("total_hours", { precision: 4, scale: 2 }),
  status: text("status").notNull().default("present"),
  location: text("location"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const payrollRecords = pgTable("payroll_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  basicSalary: numeric("basic_salary", { precision: 12, scale: 2 }).notNull(),
  allowances: numeric("allowances", { precision: 12, scale: 2 }).notNull().default("0"),
  deductions: numeric("deductions", { precision: 12, scale: 2 }).notNull().default("0"),
  tax: numeric("tax", { precision: 12, scale: 2 }).notNull().default("0"),
  netSalary: numeric("net_salary", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  payslipUrl: text("payslip_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  reviewerId: uuid("reviewer_id").notNull().references(() => profiles.id),
  period: text("period").notNull(),
  type: text("type").notNull().default("quarterly"),
  status: text("status").notNull().default("draft"),
  overallRating: integer("overall_rating"),
  goals: text("goals"), // JSON stringified
  feedback: text("feedback"),
  employeeComments: text("employee_comments"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const holidays = pgTable("holidays", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  type: text("type").notNull().default("public"),
  year: integer("year").notNull(),
});

export const trainingPrograms = pgTable("training_programs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull().default("online"),
  instructor: text("instructor"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  maxParticipants: integer("max_participants"),
  status: text("status").notNull().default("upcoming"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const companyPolicies = pgTable("company_policies", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  version: integer("version").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
  acknowledgmentRequired: boolean("acknowledgment_required").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
