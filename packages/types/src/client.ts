import type { UUID } from "./common";

export type DealStage = "lead" | "proposal" | "negotiation" | "won" | "lost";

export type Client = {
  id: UUID;
  company_name: string;
  industry: string | null;
  website: string | null;
  logo_url: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  health_score: number; // 0-100
  total_revenue: number;
  active_projects: number;
  account_manager_id: UUID | null;
  account_manager_name: string | null;
  status: "active" | "inactive" | "prospect";
  created_at: string;
  updated_at: string;
};

export type ClientContact = {
  id: UUID;
  client_id: UUID;
  name: string;
  email: string;
  phone: string | null;
  designation: string | null;
  is_primary: boolean;
  created_at: string;
};

export type Deal = {
  id: UUID;
  title: string;
  client_id: UUID;
  client_name: string;
  stage: DealStage;
  value: number;
  currency: string;
  probability: number; // 0-100
  expected_close_date: string | null;
  owner_id: UUID;
  owner_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Contract = {
  id: UUID;
  client_id: UUID;
  client_name: string;
  title: string;
  type: "fixed_price" | "time_material" | "retainer" | "sow";
  value: number;
  currency: string;
  start_date: string;
  end_date: string;
  status: "draft" | "active" | "expired" | "terminated";
  document_url: string | null;
  auto_renew: boolean;
  created_at: string;
};

export type CommunicationLog = {
  id: UUID;
  client_id: UUID;
  type: "email" | "call" | "meeting" | "note";
  subject: string;
  content: string;
  logged_by: UUID;
  logged_by_name: string;
  date: string;
  created_at: string;
};
