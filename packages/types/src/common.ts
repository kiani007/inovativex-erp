// ============================================================
// Common Types
// ============================================================

export type UUID = string;

export type PaginationParams = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type AuditLogEntry = {
  id: UUID;
  user_id: UUID;
  action: string;
  module: string;
  entity_type: string;
  entity_id: UUID;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
};

export type NotificationType =
  | "leave_request"
  | "leave_approved"
  | "leave_rejected"
  | "task_assigned"
  | "task_completed"
  | "invoice_created"
  | "invoice_overdue"
  | "expense_submitted"
  | "expense_approved"
  | "announcement"
  | "birthday"
  | "anniversary"
  | "asset_request"
  | "performance_review"
  | "standup_reminder"
  | "contract_expiry"
  | "license_expiry"
  | "general";

export type Notification = {
  id: UUID;
  user_id: UUID;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  is_read: boolean;
  created_at: string;
};
