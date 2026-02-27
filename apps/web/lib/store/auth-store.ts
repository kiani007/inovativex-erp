import { create } from "zustand";

export type UserRole =
  | "admin"
  | "hr_manager"
  | "project_manager"
  | "team_lead"
  | "employee"
  | "viewer";

interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  department_id: string | null;
  department_name: string | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (module: string, action: "create" | "read" | "update" | "delete") => boolean;
}

const PERMISSION_MATRIX: Record<UserRole, Record<string, string[]>> = {
  admin: {
    "*": ["create", "read", "update", "delete"],
  },
  hr_manager: {
    auth: ["read"],
    employees: ["create", "read", "update", "delete"],
    hr: ["create", "read", "update", "delete"],
    recruitment: ["create", "read", "update", "delete"],
    projects: ["read"],
    finance: ["read"],
    assets: ["create", "read", "update"],
    documents: ["create", "read", "update", "delete"],
    dashboard: ["read"],
  },
  project_manager: {
    auth: ["read"],
    employees: ["read"],
    hr: ["read"],
    recruitment: ["read"],
    projects: ["create", "read", "update", "delete"],
    clients: ["create", "read", "update", "delete"],
    finance: ["read"],
    assets: ["read"],
    documents: ["create", "read", "update"],
    dashboard: ["read"],
  },
  team_lead: {
    auth: ["read"],
    employees: ["read"],
    hr: ["read"],
    projects: ["create", "read", "update"],
    clients: ["read"],
    assets: ["read"],
    documents: ["create", "read", "update"],
    dashboard: ["read"],
  },
  employee: {
    auth: ["read"],
    employees: ["read"],
    hr: ["read"],
    projects: ["read", "update"],
    documents: ["read", "update"],
    dashboard: ["read"],
    assets: ["read"],
  },
  viewer: {
    auth: ["read"],
    employees: ["read"],
    hr: ["read"],
    recruitment: ["read"],
    projects: ["read"],
    clients: ["read"],
    finance: ["read"],
    assets: ["read"],
    documents: ["read"],
    dashboard: ["read"],
  },
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  hasPermission: (module, action) => {
    const { user } = get();
    if (!user) return false;
    const rolePerms = PERMISSION_MATRIX[user.role];
    if (rolePerms["*"]?.includes(action)) return true;
    return rolePerms[module]?.includes(action) ?? false;
  },
}));
