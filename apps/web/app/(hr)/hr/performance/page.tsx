"use client";

import { useState } from "react";
import {
  Play,
  Star,
  TrendingUp,
  MessageSquare,
  MoreHorizontal,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileEdit,
} from "lucide-react";

const periods = ["Q1 2026", "Q4 2025", "Q3 2025", "Q2 2025", "Q1 2025"];

const reviews = [
  {
    id: "REV-001",
    employee: "Sarah Chen",
    avatar: "SC",
    designation: "Senior Software Engineer",
    department: "Engineering",
    rating: 4.5,
    status: "completed",
    progress: 100,
    selfReview: true,
    managerReview: true,
    goals: 8,
    goalsCompleted: 7,
    feedback:
      "Exceptional performance in Q4. Led the migration project successfully.",
  },
  {
    id: "REV-002",
    employee: "Ahmed Khan",
    avatar: "AK",
    designation: "Product Manager",
    department: "Product",
    rating: 4.0,
    status: "in_review",
    progress: 75,
    selfReview: true,
    managerReview: false,
    goals: 6,
    goalsCompleted: 5,
    feedback: "Strong product vision and execution.",
  },
  {
    id: "REV-003",
    employee: "Maria Santos",
    avatar: "MS",
    designation: "Finance Manager",
    department: "Finance",
    rating: 3.5,
    status: "in_review",
    progress: 60,
    selfReview: true,
    managerReview: false,
    goals: 5,
    goalsCompleted: 3,
    feedback: "",
  },
  {
    id: "REV-004",
    employee: "James Wilson",
    avatar: "JW",
    designation: "DevOps Lead",
    department: "DevOps",
    rating: 0,
    status: "pending",
    progress: 20,
    selfReview: false,
    managerReview: false,
    goals: 7,
    goalsCompleted: 0,
    feedback: "",
  },
  {
    id: "REV-005",
    employee: "Priya Patel",
    avatar: "PP",
    designation: "HR Manager",
    department: "HR & Admin",
    rating: 5.0,
    status: "completed",
    progress: 100,
    selfReview: true,
    managerReview: true,
    goals: 6,
    goalsCompleted: 6,
    feedback:
      "Outstanding leadership and initiative. Transformed the onboarding process.",
  },
  {
    id: "REV-006",
    employee: "David Kim",
    avatar: "DK",
    designation: "UI/UX Designer",
    department: "Design",
    rating: 4.0,
    status: "self_review",
    progress: 40,
    selfReview: false,
    managerReview: false,
    goals: 5,
    goalsCompleted: 4,
    feedback: "",
  },
];

const statusConfig: Record<
  string,
  { label: string; badge: string; icon: React.ComponentType<{ className?: string }> }
> = {
  completed: {
    label: "Completed",
    badge: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  in_review: {
    label: "In Review",
    badge: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  pending: {
    label: "Pending",
    badge: "bg-yellow-100 text-yellow-700",
    icon: AlertCircle,
  },
  self_review: {
    label: "Self Review",
    badge: "bg-purple-100 text-purple-700",
    icon: FileEdit,
  },
};

function StarRating({ rating }: { rating: number }) {
  if (rating === 0) {
    return (
      <span className="text-xs text-[var(--muted-foreground)]">Not rated</span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function PerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Q1 2026");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance Reviews</h1>
          <p className="text-[var(--muted-foreground)]">
            Track and manage employee performance reviews and goals.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Play className="h-4 w-4" />
          Start Review Cycle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="h-9 appearance-none rounded-lg border bg-[var(--background)] pl-3 pr-8 text-sm font-medium outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
          >
            {periods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]" />
        </div>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="product">Product</option>
          <option value="finance">Finance</option>
          <option value="design">Design</option>
          <option value="hr">HR & Admin</option>
          <option value="devops">DevOps</option>
        </select>
        <select className="h-9 rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in_review">In Review</option>
          <option value="self_review">Self Review</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Total Reviews
              </p>
              <p className="mt-1 text-3xl font-bold">127</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-white">
              <FileEdit className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">
            {selectedPeriod} cycle
          </p>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Completed
              </p>
              <p className="mt-1 text-3xl font-bold">48</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-2 text-xs text-green-600">37.8% completion rate</p>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Avg. Rating
              </p>
              <p className="mt-1 text-3xl font-bold">4.2</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Star className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-2 text-xs text-[var(--muted-foreground)]">
            Out of 5.0
          </p>
        </div>
        <div className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Goals Achieved
              </p>
              <p className="mt-1 text-3xl font-bold">82%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500 text-white">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-2 text-xs text-green-600">+5% from last quarter</p>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const status = statusConfig[review.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={review.id}
              className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{review.employee}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {review.designation}
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {review.department}
                    </p>
                  </div>
                </div>
                <button className="rounded p-1 hover:bg-[var(--muted)]">
                  <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                </button>
              </div>

              {/* Rating */}
              <div className="mt-4">
                <StarRating rating={review.rating} />
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--muted-foreground)]">
                    Review Progress
                  </span>
                  <span className="font-medium">{review.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-[var(--muted)]">
                  <div
                    className={`h-full rounded-full transition-all ${
                      review.progress === 100
                        ? "bg-green-500"
                        : "bg-[var(--color-primary-600)]"
                    }`}
                    style={{ width: `${review.progress}%` }}
                  />
                </div>
              </div>

              {/* Goals */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Goals</span>
                <span className="font-medium">
                  {review.goalsCompleted} / {review.goals} completed
                </span>
              </div>

              {/* Review Steps */}
              <div className="mt-4 flex items-center gap-3 text-xs">
                <div
                  className={`flex items-center gap-1 ${
                    review.selfReview
                      ? "text-green-600"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {review.selfReview ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                  Self Review
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    review.managerReview
                      ? "text-green-600"
                      : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {review.managerReview ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                  Manager Review
                </div>
              </div>

              {/* Status Badge & Action */}
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.badge}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
                <button className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {review.status === "completed"
                    ? "View Feedback"
                    : "Add Feedback"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
