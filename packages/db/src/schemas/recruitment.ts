import { pgTable, uuid, text, timestamp, date, integer, numeric, pgEnum, boolean, jsonb } from "drizzle-orm/pg-core";
import { profiles, departments } from "./auth";
import { employees } from "./employees";

export const candidateStageEnum = pgEnum("candidate_stage", [
  "applied", "screening", "interview", "offer", "hired", "rejected",
]);

export const jobPostings = pgTable("job_postings", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  departmentId: uuid("department_id").notNull().references(() => departments.id),
  description: text("description").notNull(),
  requirements: jsonb("requirements").$type<string[]>().notNull().default([]),
  niceToHave: jsonb("nice_to_have").$type<string[]>().default([]),
  employmentType: text("employment_type").notNull().default("full_time"),
  experienceLevel: text("experience_level").notNull().default("mid"),
  salaryRangeMin: numeric("salary_range_min", { precision: 10, scale: 2 }),
  salaryRangeMax: numeric("salary_range_max", { precision: 10, scale: 2 }),
  currency: text("currency").notNull().default("USD"),
  location: text("location").notNull().default("office"),
  status: text("status").notNull().default("draft"),
  hiringManagerId: uuid("hiring_manager_id").notNull().references(() => profiles.id),
  applicantCount: integer("applicant_count").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  closesAt: timestamp("closes_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id").notNull().references(() => jobPostings.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  resumeUrl: text("resume_url"),
  linkedinUrl: text("linkedin_url"),
  portfolioUrl: text("portfolio_url"),
  stage: candidateStageEnum("stage").notNull().default("applied"),
  source: text("source").notNull().default("careers_page"),
  referralEmployeeId: uuid("referral_employee_id").references(() => employees.id),
  skills: jsonb("skills").$type<string[]>().default([]),
  experienceYears: integer("experience_years"),
  currentCompany: text("current_company"),
  expectedSalary: numeric("expected_salary", { precision: 10, scale: 2 }),
  notes: text("notes"),
  overallRating: integer("overall_rating"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const interviews = pgTable("interviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  candidateId: uuid("candidate_id").notNull().references(() => candidates.id),
  jobId: uuid("job_id").notNull().references(() => jobPostings.id),
  type: text("type").notNull().default("technical"),
  interviewerIds: jsonb("interviewer_ids").$type<string[]>().notNull().default([]),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  location: text("location"),
  meetingLink: text("meeting_link"),
  status: text("status").notNull().default("scheduled"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const interviewFeedback = pgTable("interview_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  interviewId: uuid("interview_id").notNull().references(() => interviews.id),
  interviewerId: uuid("interviewer_id").notNull().references(() => profiles.id),
  rating: integer("rating").notNull(),
  technicalSkills: integer("technical_skills"),
  communication: integer("communication"),
  cultureFit: integer("culture_fit"),
  problemSolving: integer("problem_solving"),
  strengths: text("strengths").notNull(),
  weaknesses: text("weaknesses").notNull(),
  recommendation: text("recommendation").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const employeeReferrals = pgTable("employee_referrals", {
  id: uuid("id").primaryKey().defaultRandom(),
  referrerId: uuid("referrer_id").notNull().references(() => employees.id),
  candidateName: text("candidate_name").notNull(),
  candidateEmail: text("candidate_email").notNull(),
  jobId: uuid("job_id").notNull().references(() => jobPostings.id),
  candidateId: uuid("candidate_id").references(() => candidates.id),
  status: text("status").notNull().default("submitted"),
  bonusEligible: boolean("bonus_eligible").notNull().default(false),
  bonusPaid: boolean("bonus_paid").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
