"use client";

import {
  Plus,
  Building2,
  Briefcase,
  DollarSign,
  FolderOpen,
  UserCircle,
} from "lucide-react";

interface Client {
  id: string;
  company: string;
  industry: string;
  healthScore: number;
  activeProjects: number;
  totalRevenue: string;
  accountManager: { name: string; initials: string };
  logo: string;
}

const clients: Client[] = [
  {
    id: "cli-001",
    company: "RetailMax Inc.",
    industry: "E-Commerce & Retail",
    healthScore: 92,
    activeProjects: 2,
    totalRevenue: "$345,000",
    accountManager: { name: "Alex Thompson", initials: "AT" },
    logo: "RM",
  },
  {
    id: "cli-002",
    company: "FinanceFirst Bank",
    industry: "Banking & Finance",
    healthScore: 85,
    activeProjects: 1,
    totalRevenue: "$520,000",
    accountManager: { name: "Sarah Chen", initials: "SC" },
    logo: "FF",
  },
  {
    id: "cli-003",
    company: "TechCorp Solutions",
    industry: "Information Technology",
    healthScore: 78,
    activeProjects: 3,
    totalRevenue: "$210,000",
    accountManager: { name: "James Lee", initials: "JL" },
    logo: "TC",
  },
  {
    id: "cli-004",
    company: "LogiFlow Ltd.",
    industry: "Logistics & Supply Chain",
    healthScore: 65,
    activeProjects: 1,
    totalRevenue: "$180,000",
    accountManager: { name: "Nina Patel", initials: "NP" },
    logo: "LF",
  },
  {
    id: "cli-005",
    company: "MediCare Group",
    industry: "Healthcare",
    healthScore: 45,
    activeProjects: 1,
    totalRevenue: "$290,000",
    accountManager: { name: "Alex Thompson", initials: "AT" },
    logo: "MG",
  },
  {
    id: "cli-006",
    company: "WareHouse Pro",
    industry: "Warehousing & Distribution",
    healthScore: 88,
    activeProjects: 2,
    totalRevenue: "$150,000",
    accountManager: { name: "Sarah Chen", initials: "SC" },
    logo: "WP",
  },
];

function getHealthColor(score: number): {
  ring: string;
  bg: string;
  text: string;
} {
  if (score > 80) {
    return {
      ring: "border-green-500",
      bg: "bg-green-100",
      text: "text-green-700",
    };
  }
  if (score >= 50) {
    return {
      ring: "border-yellow-500",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    };
  }
  return {
    ring: "border-red-500",
    bg: "bg-red-100",
    text: "text-red-700",
  };
}

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage your client relationships and accounts.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Add Client
        </button>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  const healthColor = getHealthColor(client.healthScore);

  return (
    <div className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-100)] text-sm font-bold text-[var(--color-primary-700)]">
            {client.logo}
          </div>
          <div>
            <h3 className="text-base font-semibold">{client.company}</h3>
            <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
              <Building2 className="h-3.5 w-3.5" />
              {client.industry}
            </div>
          </div>
        </div>

        {/* Health Score */}
        <div className="flex flex-col items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] ${healthColor.ring} ${healthColor.bg}`}
          >
            <span className={`text-xs font-bold ${healthColor.text}`}>
              {client.healthScore}
            </span>
          </div>
          <span className="mt-1 text-[10px] text-[var(--muted-foreground)]">
            Health
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Active Projects
            </p>
            <p className="text-sm font-semibold">{client.activeProjects}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Total Revenue
            </p>
            <p className="text-sm font-semibold">{client.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Account Manager */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--muted)] text-[10px] font-medium">
            {client.accountManager.initials}
          </div>
          <div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Account Manager
            </p>
            <p className="text-sm font-medium">
              {client.accountManager.name}
            </p>
          </div>
        </div>
        <a
          href={`/clients/${client.id}`}
          className="text-sm font-medium text-[var(--color-primary-600)] hover:underline"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
