import type { UUID } from "./common";

export type AssetStatus = "available" | "assigned" | "maintenance" | "retired";

export type Asset = {
  id: UUID;
  asset_tag: string; // e.g., "INX-HW-001"
  name: string;
  category: "laptop" | "monitor" | "keyboard" | "mouse" | "phone" | "headset" | "desk" | "chair" | "other";
  brand: string | null;
  model: string | null;
  serial_number: string | null;
  status: AssetStatus;
  assigned_to: UUID | null;
  assigned_to_name: string | null;
  assigned_date: string | null;
  purchase_date: string | null;
  purchase_price: number | null;
  warranty_expiry: string | null;
  condition: "new" | "good" | "fair" | "poor";
  location: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SoftwareLicense = {
  id: UUID;
  name: string;
  vendor: string;
  license_key: string | null;
  type: "per_seat" | "site" | "subscription" | "perpetual";
  total_seats: number | null;
  used_seats: number;
  cost_per_seat: number | null;
  total_cost: number;
  billing_cycle: "monthly" | "annual" | "one_time";
  start_date: string;
  expiry_date: string | null;
  auto_renew: boolean;
  status: "active" | "expiring_soon" | "expired";
  assigned_to: UUID[];
  created_at: string;
};

export type AssetRequest = {
  id: UUID;
  employee_id: UUID;
  employee_name: string;
  asset_type: string;
  description: string;
  urgency: "low" | "medium" | "high";
  status: "pending" | "approved" | "rejected" | "fulfilled";
  approved_by: UUID | null;
  fulfilled_asset_id: UUID | null;
  created_at: string;
  updated_at: string;
};
