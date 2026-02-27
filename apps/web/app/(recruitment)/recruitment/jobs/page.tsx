"use client";

import { Plus, MapPin, Clock, Users, Briefcase } from "lucide-react";

const jobs = [
  {
    id: "1",
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    level: "Senior",
    applicants: 12,
    status: "open",
    posted: "5 days ago",
    salary: "$120K - $160K",
  },
  {
    id: "2",
    title: "DevOps Engineer",
    department: "DevOps",
    location: "Hybrid",
    type: "Full Time",
    level: "Mid",
    applicants: 8,
    status: "open",
    posted: "1 week ago",
    salary: "$100K - $140K",
  },
  {
    id: "3",
    title: "Product Designer",
    department: "Design",
    location: "Office",
    type: "Full Time",
    level: "Senior",
    applicants: 15,
    status: "open",
    posted: "2 weeks ago",
    salary: "$110K - $145K",
  },
  {
    id: "4",
    title: "QA Automation Engineer",
    department: "QA",
    location: "Remote",
    type: "Full Time",
    level: "Mid",
    applicants: 6,
    status: "open",
    posted: "3 days ago",
    salary: "$90K - $120K",
  },
  {
    id: "5",
    title: "Backend Developer (Node.js)",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    level: "Senior",
    applicants: 20,
    status: "on_hold",
    posted: "3 weeks ago",
    salary: "$130K - $170K",
  },
  {
    id: "6",
    title: "Technical Project Manager",
    department: "Product",
    location: "Hybrid",
    type: "Full Time",
    level: "Lead",
    applicants: 9,
    status: "closed",
    posted: "1 month ago",
    salary: "$125K - $155K",
  },
];

const statusBadge: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  on_hold: "bg-yellow-100 text-yellow-700",
  closed: "bg-gray-100 text-gray-700",
};

const locationIcon: Record<string, string> = {
  Remote: "text-blue-600",
  Hybrid: "text-purple-600",
  Office: "text-green-600",
};

export default function JobPostingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage open positions and track applications.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          Create Job Posting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Open Positions", value: "4", color: "text-green-600" },
          { label: "Total Applicants", value: "70", color: "text-blue-600" },
          { label: "Interviews This Week", value: "8", color: "text-purple-600" },
          { label: "Offers Extended", value: "2", color: "text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-[var(--card)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border bg-[var(--card)] p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {job.department}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[job.status]}`}
              >
                {job.status.replace("_", " ")}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className={`h-4 w-4 ${locationIcon[job.location]}`} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span>
                  {job.type} &bull; {job.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span>Posted {job.posted}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-sm font-medium text-[var(--color-primary-600)]">
                {job.salary}
              </span>
              <button className="text-sm font-medium text-[var(--color-primary-600)] hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
