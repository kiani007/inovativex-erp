import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean } from "drizzle-orm/pg-core";
import { profiles } from "./auth";

export const dealStageEnum = pgEnum("deal_stage", [
  "lead", "proposal", "negotiation", "won", "lost",
]);

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyName: text("company_name").notNull(),
  industry: text("industry"),
  website: text("website"),
  logoUrl: text("logo_url"),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  healthScore: integer("health_score").notNull().default(100),
  totalRevenue: numeric("total_revenue", { precision: 14, scale: 2 }).notNull().default("0"),
  accountManagerId: uuid("account_manager_id").references(() => profiles.id),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const clientContacts = pgTable("client_contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  designation: text("designation"),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const deals = pgTable("deals", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  stage: dealStageEnum("stage").notNull().default("lead"),
  value: numeric("value", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  probability: integer("probability").notNull().default(0),
  expectedCloseDate: date("expected_close_date"),
  ownerId: uuid("owner_id").notNull().references(() => profiles.id),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contracts = pgTable("contracts", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  title: text("title").notNull(),
  type: text("type").notNull().default("fixed_price"),
  value: numeric("value", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: text("status").notNull().default("draft"),
  documentUrl: text("document_url"),
  autoRenew: boolean("auto_renew").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const communicationLogs = pgTable("communication_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").notNull().references(() => clients.id),
  type: text("type").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  loggedBy: uuid("logged_by").notNull().references(() => profiles.id),
  date: timestamp("date", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
