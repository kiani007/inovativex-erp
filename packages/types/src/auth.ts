import type { UUID } from "./common";

export type UserRole =
  | "admin"
  | "hr_manager"
  | "project_manager"
  | "team_lead"
  | "employee"
  | "viewer";

export type Permission = {
  module: string;
  actions: ("create" | "read" | "update" | "delete")[];
};

export type UserProfile = {
  id: UUID;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  department_id: UUID | null;
  department_name: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
};

export type Session = {
  id: UUID;
  user_id: UUID;
  device: string;
  ip_address: string;
  last_active: string;
  created_at: string;
};
