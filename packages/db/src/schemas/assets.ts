import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean, jsonb } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { employees } from "./employees";

export const assetStatusEnum = pgEnum("asset_status", [
  "available", "assigned", "maintenance", "retired",
]);

export const assetCategoryEnum = pgEnum("asset_category", [
  "laptop", "monitor", "keyboard", "mouse", "phone", "headset", "desk", "chair", "other",
]);

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  assetTag: text("asset_tag").notNull().unique(),
  name: text("name").notNull(),
  category: assetCategoryEnum("category").notNull(),
  brand: text("brand"),
  model: text("model"),
  serialNumber: text("serial_number"),
  status: assetStatusEnum("status").notNull().default("available"),
  assignedTo: uuid("assigned_to").references(() => employees.id),
  assignedDate: date("assigned_date"),
  purchaseDate: date("purchase_date"),
  purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }),
  warrantyExpiry: date("warranty_expiry"),
  condition: text("condition").notNull().default("new"),
  location: text("location"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const softwareLicenses = pgTable("software_licenses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  vendor: text("vendor").notNull(),
  licenseKey: text("license_key"),
  type: text("type").notNull().default("subscription"),
  totalSeats: integer("total_seats"),
  usedSeats: integer("used_seats").notNull().default(0),
  costPerSeat: numeric("cost_per_seat", { precision: 10, scale: 2 }),
  totalCost: numeric("total_cost", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle").notNull().default("monthly"),
  startDate: date("start_date").notNull(),
  expiryDate: date("expiry_date"),
  autoRenew: boolean("auto_renew").notNull().default(true),
  status: text("status").notNull().default("active"),
  assignedTo: jsonb("assigned_to").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const assetRequests = pgTable("asset_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  assetType: text("asset_type").notNull(),
  description: text("description").notNull(),
  urgency: text("urgency").notNull().default("medium"),
  status: text("status").notNull().default("pending"),
  approvedBy: uuid("approved_by").references(() => profiles.id),
  fulfilledAssetId: uuid("fulfilled_asset_id").references(() => assets.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
