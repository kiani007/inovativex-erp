import type { UUID } from "./common";

export type CandidateStage = "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";

export type JobPosting = {
  id: UUID;
  title: string;
  department_id: UUID;
  department_name: string;
  description: string;
  requirements: string[];
  nice_to_have: string[];
  employment_type: "full_time" | "part_time" | "contract" | "intern";
  experience_level: "junior" | "mid" | "senior" | "lead" | "principal";
  salary_range_min: number | null;
  salary_range_max: number | null;
  currency: string;
  location: "office" | "remote" | "hybrid";
  status: "draft" | "open" | "closed" | "on_hold";
  hiring_manager_id: UUID;
  hiring_manager_name: string;
  applicant_count: number;
  published_at: string | null;
  closes_at: string | null;
  created_at: string;
};

export type Candidate = {
  id: UUID;
  job_id: UUID;
  job_title: string;
  full_name: string;
  email: string;
  phone: string | null;
  resume_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  stage: CandidateStage;
  source: "careers_page" | "referral" | "linkedin" | "job_board" | "agency" | "other";
  referral_employee_id: UUID | null;
  skills: string[];
  experience_years: number | null;
  current_company: string | null;
  expected_salary: number | null;
  notes: string | null;
  overall_rating: number | null; // 1-5
  created_at: string;
  updated_at: string;
};

export type Interview = {
  id: UUID;
  candidate_id: UUID;
  candidate_name: string;
  job_id: UUID;
  job_title: string;
  type: "phone_screen" | "technical" | "behavioral" | "culture_fit" | "final";
  interviewer_ids: UUID[];
  interviewer_names: string[];
  scheduled_at: string;
  duration_minutes: number;
  location: string | null;
  meeting_link: string | null;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  created_at: string;
};

export type InterviewFeedback = {
  id: UUID;
  interview_id: UUID;
  interviewer_id: UUID;
  interviewer_name: string;
  rating: number; // 1-5
  technical_skills: number | null;
  communication: number | null;
  culture_fit: number | null;
  problem_solving: number | null;
  strengths: string;
  weaknesses: string;
  recommendation: "strong_hire" | "hire" | "no_hire" | "strong_no_hire";
  notes: string | null;
  created_at: string;
};

export type EmployeeReferral = {
  id: UUID;
  referrer_id: UUID;
  referrer_name: string;
  candidate_name: string;
  candidate_email: string;
  job_id: UUID;
  job_title: string;
  candidate_id: UUID | null;
  status: "submitted" | "reviewing" | "hired" | "not_selected";
  bonus_eligible: boolean;
  bonus_paid: boolean;
  created_at: string;
};
