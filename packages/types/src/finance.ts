import type { UUID } from "./common";

export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";
export type ExpenseStatus = "draft" | "submitted" | "approved" | "rejected" | "reimbursed";

export type Invoice = {
  id: UUID;
  invoice_number: string; // e.g., "INV-2026-001"
  client_id: UUID;
  client_name: string;
  project_id: UUID | null;
  project_name: string | null;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount: number;
  total: number;
  currency: string;
  notes: string | null;
  payment_terms: string | null;
  paid_at: string | null;
  sent_at: string | null;
  pdf_url: string | null;
  created_by: UUID;
  created_at: string;
  updated_at: string;
};

export type InvoiceItem = {
  id: UUID;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
};

export type Expense = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  category: "travel" | "meals" | "software" | "hardware" | "office" | "training" | "other";
  description: string;
  amount: number;
  currency: string;
  date: string;
  receipt_url: string | null;
  status: ExpenseStatus;
  approved_by: UUID | null;
  approver_name: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  reimbursed_at: string | null;
  project_id: UUID | null;
  project_name: string | null;
  created_at: string;
};

export type Budget = {
  id: UUID;
  name: string;
  type: "project" | "department" | "company";
  reference_id: UUID | null; // project_id or department_id
  reference_name: string | null;
  total_amount: number;
  spent_amount: number;
  remaining_amount: number;
  currency: string;
  period_start: string;
  period_end: string;
  status: "active" | "exceeded" | "closed";
  alert_threshold: number; // percentage
  created_at: string;
};

export type RevenueReport = {
  period: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  invoiced: number;
  collected: number;
  outstanding: number;
};
