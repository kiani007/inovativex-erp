import { Suspense } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DashboardStats } from "@/components/modules/dashboard/dashboard-stats";
import { RecentActivity } from "@/components/modules/dashboard/recent-activity";
import { TeamOverview } from "@/components/modules/dashboard/team-overview";
import { ProjectSummary } from "@/components/modules/dashboard/project-summary";
import { LeaveCalendar } from "@/components/modules/dashboard/leave-calendar";
import { FinanceSummary } from "@/components/modules/dashboard/finance-summary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[var(--muted-foreground)]">
          Welcome back! Here&apos;s what&apos;s happening at Inovativex.
        </p>
      </div>

      {/* KPI Cards */}
      <Suspense fallback={<StatsSkeletons />}>
        <DashboardStats />
      </Suspense>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          <Suspense fallback={<CardSkeleton title="Project Summary" />}>
            <ProjectSummary />
          </Suspense>
          <Suspense fallback={<CardSkeleton title="Recent Activity" />}>
            <RecentActivity />
          </Suspense>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          <Suspense fallback={<CardSkeleton title="Team Overview" />}>
            <TeamOverview />
          </Suspense>
          <Suspense fallback={<CardSkeleton title="Who's Out" />}>
            <LeaveCalendar />
          </Suspense>
          <Suspense fallback={<CardSkeleton title="Finance" />}>
            <FinanceSummary />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function StatsSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-xl bg-[var(--muted)]" />
      ))}
    </div>
  );
}

function CardSkeleton({ title }: { title: string }) {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 h-48 animate-pulse rounded-lg bg-[var(--muted)]" />
    </div>
  );
}
