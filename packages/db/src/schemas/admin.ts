import { pgTable, uuid, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

export const systemSettings = pgTable("system_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const integrations = pgTable("integrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(), // slack, github, quickbooks, google, microsoft
  config: jsonb("config").$type<Record<string, string>>().notNull().default({}),
  isActive: boolean("is_active").notNull().default(false),
  lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  link: text("link"),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: uuid("author_id").notNull(),
  priority: text("priority").notNull().default("normal"),
  targetDepartments: jsonb("target_departments").$type<string[]>().default([]),
  isPinned: boolean("is_pinned").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const workflowDefinitions = pgTable("workflow_definitions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  module: text("module").notNull(),
  trigger: text("trigger").notNull(),
  steps: jsonb("steps").$type<{
    id: string;
    type: "approval" | "notification" | "action" | "condition";
    config: Record<string, unknown>;
    nextSteps: string[];
  }[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(), // file, template, policy
  category: text("category"),
  mimeType: text("mime_type"),
  size: integer("size"),
  storageUrl: text("storage_url").notNull(),
  folderId: uuid("folder_id"),
  uploadedBy: uuid("uploaded_by").notNull(),
  version: integer("version").notNull().default(1),
  isPublic: boolean("is_public").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
