import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean, jsonb } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { employees } from "./employees";
import { clients } from "./clients";
import { projects } from "./projects";

export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft", "sent", "viewed", "paid", "overdue", "cancelled",
]);

export const expenseStatusEnum = pgEnum("expense_status", [
  "draft", "submitted", "approved", "rejected", "reimbursed",
]);

export const expenseCategoryEnum = pgEnum("expense_category", [
  "travel", "meals", "software", "hardware", "office", "training", "other",
]);

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  projectId: uuid("project_id").references(() => projects.id),
  status: invoiceStatusEnum("status").notNull().default("draft"),
  issueDate: date("issue_date").notNull(),
  dueDate: date("due_date").notNull(),
  items: jsonb("items").$type<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[]>().notNull().default([]),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
  taxRate: numeric("tax_rate", { precision: 5, scale: 2 }).notNull().default("0"),
  taxAmount: numeric("tax_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  discount: numeric("discount", { precision: 12, scale: 2 }).notNull().default("0"),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  notes: text("notes"),
  paymentTerms: text("payment_terms"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  pdfUrl: text("pdf_url"),
  createdBy: uuid("created_by").notNull().references(() => profiles.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  category: expenseCategoryEnum("category").notNull(),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  date: date("date").notNull(),
  receiptUrl: text("receipt_url"),
  status: expenseStatusEnum("status").notNull().default("draft"),
  approvedBy: uuid("approved_by").references(() => profiles.id),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  rejectionReason: text("rejection_reason"),
  reimbursedAt: timestamp("reimbursed_at", { withTimezone: true }),
  projectId: uuid("project_id").references(() => projects.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const budgets = pgTable("budgets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull().default("project"),
  referenceId: uuid("reference_id"),
  totalAmount: numeric("total_amount", { precision: 14, scale: 2 }).notNull(),
  spentAmount: numeric("spent_amount", { precision: 14, scale: 2 }).notNull().default("0"),
  currency: text("currency").notNull().default("USD"),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  status: text("status").notNull().default("active"),
  alertThreshold: integer("alert_threshold").notNull().default(80),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
