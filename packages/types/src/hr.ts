import type { UUID } from "./common";

// ============================================================
// Leave Management
// ============================================================

export type LeaveType =
  | "annual"
  | "sick"
  | "casual"
  | "maternity"
  | "paternity"
  | "wfh"
  | "unpaid";

export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export type LeaveRequest = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  employee_avatar: string | null;
  department_name: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  approved_by: UUID | null;
  approver_name: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type LeaveBalance = {
  employee_id: UUID;
  year: number;
  annual_total: number;
  annual_used: number;
  annual_remaining: number;
  sick_total: number;
  sick_used: number;
  sick_remaining: number;
  casual_total: number;
  casual_used: number;
  casual_remaining: number;
  wfh_total: number;
  wfh_used: number;
  wfh_remaining: number;
};

// ============================================================
// Attendance
// ============================================================

export type AttendanceRecord = {
  id: UUID;
  employee_id: UUID;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  total_hours: number | null;
  status: "present" | "absent" | "half_day" | "wfh" | "on_leave" | "holiday";
  location: "office" | "remote" | null;
  notes: string | null;
  created_at: string;
};

// ============================================================
// Payroll
// ============================================================

export type PayrollRecord = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  month: number;
  year: number;
  basic_salary: number;
  allowances: number;
  deductions: number;
  tax: number;
  net_salary: number;
  status: "draft" | "processing" | "approved" | "paid";
  paid_at: string | null;
  payslip_url: string | null;
  created_at: string;
};

export type SalaryStructure = {
  id: UUID;
  employee_id: UUID;
  basic_salary: number;
  housing_allowance: number;
  transport_allowance: number;
  meal_allowance: number;
  other_allowances: number;
  tax_rate: number;
  insurance_deduction: number;
  other_deductions: number;
  effective_from: string;
  created_at: string;
};

// ============================================================
// Performance
// ============================================================

export type PerformanceReview = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  reviewer_id: UUID;
  reviewer_name: string;
  period: string; // e.g., "Q1 2026"
  type: "quarterly" | "annual" | "probation" | "360";
  status: "draft" | "self_assessment" | "manager_review" | "completed";
  overall_rating: number | null; // 1-5
  goals: PerformanceGoal[];
  feedback: string | null;
  employee_comments: string | null;
  created_at: string;
  completed_at: string | null;
};

export type PerformanceGoal = {
  id: UUID;
  title: string;
  description: string;
  target: string;
  progress: number; // 0-100
  status: "not_started" | "in_progress" | "completed";
  rating: number | null; // 1-5
  comments: string | null;
};

// ============================================================
// Training
// ============================================================

export type TrainingProgram = {
  id: UUID;
  title: string;
  description: string;
  type: "online" | "in_person" | "workshop" | "certification";
  instructor: string | null;
  start_date: string;
  end_date: string;
  max_participants: number | null;
  enrolled_count: number;
  status: "upcoming" | "in_progress" | "completed" | "cancelled";
  created_at: string;
};

// ============================================================
// Holiday & Policy
// ============================================================

export type Holiday = {
  id: UUID;
  name: string;
  date: string;
  type: "public" | "company" | "optional";
  year: number;
};

export type CompanyPolicy = {
  id: UUID;
  title: string;
  category: string;
  content: string;
  version: number;
  is_active: boolean;
  acknowledgment_required: boolean;
  acknowledged_count: number;
  total_employees: number;
  published_at: string;
  updated_at: string;
};
