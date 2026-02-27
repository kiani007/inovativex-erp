import { pgTable, uuid, text, timestamp, date, pgEnum, jsonb } from "drizzle-orm/pg-core";
import { profiles, departments } from "./auth";

export const employmentTypeEnum = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "intern",
]);

export const employeeStatusEnum = pgEnum("employee_status", [
  "active",
  "on_leave",
  "terminated",
  "resigned",
]);

export const genderEnum = pgEnum("gender", [
  "male",
  "female",
  "other",
  "prefer_not_to_say",
]);

export const employees = pgTable("employees", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id).unique(),
  employeeId: text("employee_id").notNull().unique(), // INX-001
  phone: text("phone"),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  address: text("address"),
  city: text("city"),
  country: text("country"),

  // Employment
  departmentId: uuid("department_id").notNull().references(() => departments.id),
  designation: text("designation").notNull(),
  managerId: uuid("manager_id"),
  employmentType: employmentTypeEnum("employment_type").notNull().default("full_time"),
  joinDate: date("join_date").notNull(),
  endDate: date("end_date"),
  probationEndDate: date("probation_end_date"),
  status: employeeStatusEnum("status").notNull().default("active"),

  // Emergency
  emergencyContactName: text("emergency_contact_name"),
  emergencyContactPhone: text("emergency_contact_phone"),
  emergencyContactRelation: text("emergency_contact_relation"),

  // Skills
  skills: jsonb("skills").$type<string[]>().default([]),
  certifications: jsonb("certifications").$type<string[]>().default([]),

  // Bank
  bankName: text("bank_name"),
  bankAccountNumber: text("bank_account_number"),
  taxId: text("tax_id"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const onboardingChecklists = pgTable("onboarding_checklists", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  items: jsonb("items").$type<{
    id: string;
    title: string;
    description: string | null;
    category: string;
    isCompleted: boolean;
    completedAt: string | null;
    completedBy: string | null;
  }[]>().notNull().default([]),
  status: text("status").notNull().default("in_progress"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const employeeTimeline = pgTable("employee_timeline", {
  id: uuid("id").primaryKey().defaultRandom(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  eventType: text("event_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
