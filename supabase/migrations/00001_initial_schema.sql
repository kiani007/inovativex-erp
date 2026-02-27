-- ============================================================
-- Inovativex ERP — Initial Database Migration
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM (
  'admin', 'hr_manager', 'project_manager', 'team_lead', 'employee', 'viewer'
);

CREATE TYPE employment_type AS ENUM (
  'full_time', 'part_time', 'contract', 'intern'
);

CREATE TYPE employee_status AS ENUM (
  'active', 'on_leave', 'terminated', 'resigned'
);

CREATE TYPE leave_type AS ENUM (
  'annual', 'sick', 'casual', 'maternity', 'paternity', 'wfh', 'unpaid'
);

CREATE TYPE leave_status AS ENUM (
  'pending', 'approved', 'rejected', 'cancelled'
);

CREATE TYPE project_status AS ENUM (
  'planning', 'active', 'on_hold', 'completed', 'cancelled'
);

CREATE TYPE task_status AS ENUM (
  'backlog', 'todo', 'in_progress', 'review', 'done'
);

CREATE TYPE task_priority AS ENUM (
  'low', 'medium', 'high', 'urgent'
);

CREATE TYPE deal_stage AS ENUM (
  'lead', 'proposal', 'negotiation', 'won', 'lost'
);

CREATE TYPE invoice_status AS ENUM (
  'draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled'
);

CREATE TYPE expense_status AS ENUM (
  'draft', 'submitted', 'approved', 'rejected', 'reimbursed'
);

CREATE TYPE expense_category AS ENUM (
  'travel', 'meals', 'software', 'hardware', 'office', 'training', 'other'
);

CREATE TYPE asset_status AS ENUM (
  'available', 'assigned', 'maintenance', 'retired'
);

CREATE TYPE asset_category AS ENUM (
  'laptop', 'monitor', 'keyboard', 'mouse', 'phone', 'headset', 'desk', 'chair', 'other'
);

CREATE TYPE candidate_stage AS ENUM (
  'applied', 'screening', 'interview', 'offer', 'hired', 'rejected'
);

-- ============================================================
-- CORE TABLES
-- ============================================================

-- Departments
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  head_id UUID,
  parent_id UUID REFERENCES departments(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Profiles (linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'employee',
  department_id UUID REFERENCES departments(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key for department head
ALTER TABLE departments ADD CONSTRAINT fk_dept_head FOREIGN KEY (head_id) REFERENCES profiles(id);

-- ============================================================
-- EMPLOYEE TABLES
-- ============================================================

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id),
  employee_id TEXT NOT NULL UNIQUE,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  department_id UUID NOT NULL REFERENCES departments(id),
  designation TEXT NOT NULL,
  manager_id UUID REFERENCES employees(id),
  employment_type employment_type NOT NULL DEFAULT 'full_time',
  join_date DATE NOT NULL,
  end_date DATE,
  probation_end_date DATE,
  status employee_status NOT NULL DEFAULT 'active',
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relation TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  bank_name TEXT,
  bank_account_number TEXT,
  tax_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE onboarding_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employee_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- HR TABLES
-- ============================================================

CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  leave_type leave_type NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status leave_status NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE leave_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  year INTEGER NOT NULL,
  annual_total INTEGER NOT NULL DEFAULT 20,
  annual_used INTEGER NOT NULL DEFAULT 0,
  sick_total INTEGER NOT NULL DEFAULT 10,
  sick_used INTEGER NOT NULL DEFAULT 0,
  casual_total INTEGER NOT NULL DEFAULT 5,
  casual_used INTEGER NOT NULL DEFAULT 0,
  wfh_total INTEGER NOT NULL DEFAULT 24,
  wfh_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, year)
);

CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  date DATE NOT NULL,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  total_hours NUMERIC(4,2),
  status TEXT NOT NULL DEFAULT 'present',
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  basic_salary NUMERIC(12,2) NOT NULL,
  allowances NUMERIC(12,2) NOT NULL DEFAULT 0,
  deductions NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax NUMERIC(12,2) NOT NULL DEFAULT 0,
  net_salary NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  paid_at TIMESTAMPTZ,
  payslip_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  period TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'quarterly',
  status TEXT NOT NULL DEFAULT 'draft',
  overall_rating INTEGER,
  goals TEXT,
  feedback TEXT,
  employee_comments TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE holidays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL DEFAULT 'public',
  year INTEGER NOT NULL
);

CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'online',
  instructor TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_participants INTEGER,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE company_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  acknowledgment_required BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PROJECT TABLES
-- ============================================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  logo_url TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  health_score INTEGER NOT NULL DEFAULT 100,
  total_revenue NUMERIC(14,2) NOT NULL DEFAULT 0,
  account_manager_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES clients(id),
  status project_status NOT NULL DEFAULT 'planning',
  start_date DATE NOT NULL,
  end_date DATE,
  budget NUMERIC(12,2),
  spent NUMERIC(12,2) NOT NULL DEFAULT 0,
  manager_id UUID NOT NULL REFERENCES profiles(id),
  team_members JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  github_repo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id),
  name TEXT NOT NULL,
  goal TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planning',
  total_points INTEGER NOT NULL DEFAULT 0,
  completed_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id),
  sprint_id UUID REFERENCES sprints(id),
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'backlog',
  priority task_priority NOT NULL DEFAULT 'medium',
  assignee_id UUID REFERENCES profiles(id),
  reporter_id UUID NOT NULL REFERENCES profiles(id),
  labels JSONB DEFAULT '[]'::jsonb,
  story_points INTEGER,
  estimated_hours NUMERIC(6,2),
  logged_hours NUMERIC(6,2) NOT NULL DEFAULT 0,
  due_date DATE,
  github_pr_url TEXT,
  parent_task_id UUID REFERENCES tasks(id),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id),
  project_id UUID NOT NULL REFERENCES projects(id),
  employee_id UUID NOT NULL REFERENCES employees(id),
  date DATE NOT NULL,
  hours NUMERIC(4,2) NOT NULL,
  description TEXT,
  is_billable BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE standup_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  project_id UUID NOT NULL REFERENCES projects(id),
  date DATE NOT NULL,
  yesterday TEXT NOT NULL,
  today TEXT NOT NULL,
  blockers TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CRM TABLES
-- ============================================================

CREATE TABLE client_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  designation TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id),
  stage deal_stage NOT NULL DEFAULT 'lead',
  value NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  probability INTEGER NOT NULL DEFAULT 0,
  expected_close_date DATE,
  owner_id UUID NOT NULL REFERENCES profiles(id),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'fixed_price',
  value NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  document_url TEXT,
  auto_renew BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE communication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  type TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  logged_by UUID NOT NULL REFERENCES profiles(id),
  date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- FINANCE TABLES
-- ============================================================

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  project_id UUID REFERENCES projects(id),
  status invoice_status NOT NULL DEFAULT 'draft',
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12,2) NOT NULL,
  tax_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  notes TEXT,
  payment_terms TEXT,
  paid_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  pdf_url TEXT,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  category expense_category NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  date DATE NOT NULL,
  receipt_url TEXT,
  status expense_status NOT NULL DEFAULT 'draft',
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  reimbursed_at TIMESTAMPTZ,
  project_id UUID REFERENCES projects(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'project',
  reference_id UUID,
  total_amount NUMERIC(14,2) NOT NULL,
  spent_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  alert_threshold INTEGER NOT NULL DEFAULT 80,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ASSET TABLES
-- ============================================================

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_tag TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category asset_category NOT NULL,
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  status asset_status NOT NULL DEFAULT 'available',
  assigned_to UUID REFERENCES employees(id),
  assigned_date DATE,
  purchase_date DATE,
  purchase_price NUMERIC(10,2),
  warranty_expiry DATE,
  condition TEXT NOT NULL DEFAULT 'new',
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE software_licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  vendor TEXT NOT NULL,
  license_key TEXT,
  type TEXT NOT NULL DEFAULT 'subscription',
  total_seats INTEGER,
  used_seats INTEGER NOT NULL DEFAULT 0,
  cost_per_seat NUMERIC(10,2),
  total_cost NUMERIC(10,2) NOT NULL,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',
  start_date DATE NOT NULL,
  expiry_date DATE,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'active',
  assigned_to JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE asset_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  asset_type TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES profiles(id),
  fulfilled_asset_id UUID REFERENCES assets(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- RECRUITMENT TABLES
-- ============================================================

CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department_id UUID NOT NULL REFERENCES departments(id),
  description TEXT NOT NULL,
  requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  nice_to_have JSONB DEFAULT '[]'::jsonb,
  employment_type TEXT NOT NULL DEFAULT 'full_time',
  experience_level TEXT NOT NULL DEFAULT 'mid',
  salary_range_min NUMERIC(10,2),
  salary_range_max NUMERIC(10,2),
  currency TEXT NOT NULL DEFAULT 'USD',
  location TEXT NOT NULL DEFAULT 'office',
  status TEXT NOT NULL DEFAULT 'draft',
  hiring_manager_id UUID NOT NULL REFERENCES profiles(id),
  applicant_count INTEGER NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES job_postings(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  stage candidate_stage NOT NULL DEFAULT 'applied',
  source TEXT NOT NULL DEFAULT 'careers_page',
  referral_employee_id UUID REFERENCES employees(id),
  skills JSONB DEFAULT '[]'::jsonb,
  experience_years INTEGER,
  current_company TEXT,
  expected_salary NUMERIC(10,2),
  notes TEXT,
  overall_rating INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(id),
  job_id UUID NOT NULL REFERENCES job_postings(id),
  type TEXT NOT NULL DEFAULT 'technical',
  interviewer_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  location TEXT,
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE interview_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interview_id UUID NOT NULL REFERENCES interviews(id),
  interviewer_id UUID NOT NULL REFERENCES profiles(id),
  rating INTEGER NOT NULL,
  technical_skills INTEGER,
  communication INTEGER,
  culture_fit INTEGER,
  problem_solving INTEGER,
  strengths TEXT NOT NULL,
  weaknesses TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE employee_referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES employees(id),
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  job_id UUID NOT NULL REFERENCES job_postings(id),
  candidate_id UUID REFERENCES candidates(id),
  status TEXT NOT NULL DEFAULT 'submitted',
  bonus_eligible BOOLEAN NOT NULL DEFAULT false,
  bonus_paid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ADMIN TABLES
-- ============================================================

CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT false,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal',
  target_departments JSONB DEFAULT '[]'::jsonb,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT,
  mime_type TEXT,
  size INTEGER,
  storage_url TEXT NOT NULL,
  folder_id UUID,
  uploaded_by UUID NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  is_public BOOLEAN NOT NULL DEFAULT false,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data TEXT,
  new_data TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE workflow_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  module TEXT NOT NULL,
  trigger TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_leave_requests_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_attendance_employee_date ON attendance_records(employee_id, date);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_sprint ON tasks(sprint_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_time_entries_employee ON time_entries(employee_id);
CREATE INDEX idx_time_entries_date ON time_entries(date);
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_expenses_employee ON expenses(employee_id);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_deals_client ON deals(client_id);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_candidates_job ON candidates(job_id);
CREATE INDEX idx_candidates_stage ON candidates(stage);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_module ON audit_logs(module);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all profiles but only update their own
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = auth_user_id);

-- Notifications: users can only see their own
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE USING (auth.uid()::text = user_id::text);

-- ============================================================
-- SEED DEFAULT SETTINGS
-- ============================================================

INSERT INTO system_settings (key, value, category, description) VALUES
  ('company_name', 'Inovativex', 'general', 'Company name'),
  ('timezone', 'America/New_York', 'general', 'Default timezone'),
  ('date_format', 'MM/DD/YYYY', 'general', 'Date display format'),
  ('currency', 'USD', 'general', 'Default currency'),
  ('fiscal_year_start', '1', 'finance', 'Fiscal year start month'),
  ('working_hours_start', '09:00', 'hr', 'Working hours start'),
  ('working_hours_end', '18:00', 'hr', 'Working hours end'),
  ('annual_leave_days', '20', 'hr', 'Default annual leave days'),
  ('sick_leave_days', '10', 'hr', 'Default sick leave days'),
  ('casual_leave_days', '5', 'hr', 'Default casual leave days'),
  ('wfh_days_per_month', '8', 'hr', 'Default WFH days per month');

-- Seed default departments
INSERT INTO departments (name, description) VALUES
  ('Engineering', 'Software development and architecture'),
  ('Design', 'UI/UX and visual design'),
  ('Product', 'Product management and strategy'),
  ('QA', 'Quality assurance and testing'),
  ('DevOps', 'Infrastructure and deployment'),
  ('HR & Admin', 'Human resources and administration'),
  ('Sales & Marketing', 'Business development and marketing'),
  ('Finance', 'Financial management and accounting'),
  ('Management', 'Executive leadership');

-- Seed default integrations
INSERT INTO integrations (name, type, is_active) VALUES
  ('Slack', 'slack', false),
  ('GitHub', 'github', false),
  ('QuickBooks', 'quickbooks', false),
  ('Google Workspace', 'google', false),
  ('Microsoft 365', 'microsoft', false);
