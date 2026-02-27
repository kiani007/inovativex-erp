// ============================================================
// Supabase Database Type (auto-generated placeholder)
// Run `supabase gen types typescript` to regenerate
// ============================================================

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: string;
          department_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: string;
          department_id?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: string;
          department_id?: string | null;
          updated_at?: string;
        };
      };
      departments: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          head_id: string | null;
          parent_id: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          head_id?: string | null;
          parent_id?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          head_id?: string | null;
          parent_id?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "admin" | "hr_manager" | "project_manager" | "team_lead" | "employee" | "viewer";
      leave_type: "annual" | "sick" | "casual" | "maternity" | "paternity" | "wfh" | "unpaid";
      leave_status: "pending" | "approved" | "rejected" | "cancelled";
      project_status: "planning" | "active" | "on_hold" | "completed" | "cancelled";
      task_status: "backlog" | "todo" | "in_progress" | "review" | "done";
      task_priority: "low" | "medium" | "high" | "urgent";
      invoice_status: "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";
      expense_status: "draft" | "submitted" | "approved" | "rejected" | "reimbursed";
      deal_stage: "lead" | "proposal" | "negotiation" | "won" | "lost";
      asset_status: "available" | "assigned" | "maintenance" | "retired";
      candidate_stage: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
    };
  };
};
