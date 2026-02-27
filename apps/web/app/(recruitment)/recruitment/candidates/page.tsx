"use client";

import { useState } from "react";
import { Search, Filter, Star, ExternalLink, MoreHorizontal } from "lucide-react";

const stages = ["applied", "screening", "interview", "offer", "hired", "rejected"] as const;

const candidates = [
  { id: "1", name: "John Parker", email: "john@example.com", job: "Senior React Developer", stage: "interview", rating: 4, source: "LinkedIn", experience: 6, applied: "Feb 20" },
  { id: "2", name: "Emma Davis", email: "emma@example.com", job: "DevOps Engineer", stage: "screening", rating: 3, source: "Referral", experience: 4, applied: "Feb 22" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", job: "Product Designer", stage: "offer", rating: 5, source: "Careers Page", experience: 8, applied: "Feb 10" },
  { id: "4", name: "Sophia Lee", email: "sophia@example.com", job: "Senior React Developer", stage: "interview", rating: 4, source: "Job Board", experience: 5, applied: "Feb 18" },
  { id: "5", name: "Alex Turner", email: "alex@example.com", job: "QA Automation Engineer", stage: "applied", rating: 0, source: "LinkedIn", experience: 3, applied: "Feb 25" },
  { id: "6", name: "Rachel Green", email: "rachel@example.com", job: "DevOps Engineer", stage: "rejected", rating: 2, source: "Agency", experience: 2, applied: "Feb 15" },
  { id: "7", name: "David Brown", email: "david@example.com", job: "Product Designer", stage: "hired", rating: 5, source: "Referral", experience: 7, applied: "Jan 28" },
  { id: "8", name: "Nina Adams", email: "nina@example.com", job: "Senior React Developer", stage: "screening", rating: 3, source: "Careers Page", experience: 4, applied: "Feb 24" },
];

const stageBadge: Record<string, string> = {
  applied: "bg-gray-100 text-gray-700",
  screening: "bg-blue-100 text-blue-700",
  interview: "bg-purple-100 text-purple-700",
  offer: "bg-amber-100 text-amber-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function CandidatesPage() {
  const [stageFilter, setStageFilter] = useState<string>("");

  const filtered = stageFilter
    ? candidates.filter((c) => c.stage === stageFilter)
    : candidates;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Candidates</h1>
          <p className="text-[var(--muted-foreground)]">
            {candidates.length} total candidates across all positions.
          </p>
        </div>
      </div>

      {/* Pipeline overview */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {stages.map((stage) => {
          const count = candidates.filter((c) => c.stage === stage).length;
          return (
            <button
              key={stage}
              onClick={() => setStageFilter(stageFilter === stage ? "" : stage)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                stageFilter === stage
                  ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]"
                  : "hover:bg-[var(--muted)]"
              }`}
            >
              <p className="text-lg font-bold">{count}</p>
              <p className="text-xs capitalize text-[var(--muted-foreground)]">
                {stage}
              </p>
            </button>
          );
        })}
      </div>

      {/* Candidate Table */}
      <div className="rounded-xl border bg-[var(--card)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                <th className="px-4 py-3 font-medium">Candidate</th>
                <th className="px-4 py-3 font-medium">Position</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Experience</th>
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-xs font-medium">
                        {c.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.job}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stageBadge[c.stage]}`}>
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < c.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{c.source}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{c.experience} yrs</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{c.applied}</td>
                  <td className="px-4 py-3">
                    <button className="rounded p-1 hover:bg-[var(--muted)]">
                      <MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
