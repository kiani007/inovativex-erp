import type { UUID } from "./common";
import type { UserRole } from "./auth";

export type Employee = {
  id: UUID;
  user_id: UUID;
  employee_id: string; // e.g., "INX-001"
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  address: string | null;
  city: string | null;
  country: string | null;

  // Employment
  department_id: UUID;
  department_name: string;
  designation: string;
  role: UserRole;
  manager_id: UUID | null;
  manager_name: string | null;
  employment_type: "full_time" | "part_time" | "contract" | "intern";
  join_date: string;
  end_date: string | null;
  probation_end_date: string | null;
  status: "active" | "on_leave" | "terminated" | "resigned";

  // Emergency Contact
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relation: string | null;

  // Skills
  skills: string[];
  certifications: string[];

  // Bank Details
  bank_name: string | null;
  bank_account_number: string | null;
  tax_id: string | null;

  created_at: string;
  updated_at: string;
};

export type Department = {
  id: UUID;
  name: string;
  description: string | null;
  head_id: UUID | null;
  head_name: string | null;
  parent_id: UUID | null;
  employee_count: number;
  created_at: string;
};

export type OnboardingChecklist = {
  id: UUID;
  employee_id: UUID;
  items: OnboardingItem[];
  completed_count: number;
  total_count: number;
  status: "in_progress" | "completed";
  created_at: string;
};

export type OnboardingItem = {
  id: UUID;
  title: string;
  description: string | null;
  category: "accounts" | "equipment" | "documents" | "orientation" | "other";
  is_completed: boolean;
  completed_at: string | null;
  completed_by: UUID | null;
};

export type EmployeeTimeline = {
  id: UUID;
  employee_id: UUID;
  event_type: "joined" | "promoted" | "role_change" | "department_change" | "achievement" | "certification" | "resigned" | "terminated";
  title: string;
  description: string | null;
  date: string;
  created_at: string;
};
