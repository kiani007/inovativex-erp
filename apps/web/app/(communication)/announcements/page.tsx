"use client";

import { Plus, Pin, Megaphone, Clock, Building2 } from "lucide-react";

const announcements = [
  {
    id: "1",
    title: "Office Closed — National Holiday (March 5)",
    content: "The office will be closed on March 5th for the national holiday. Please plan your work accordingly. If you have any urgent deliverables, coordinate with your team leads by March 4th.",
    author: "Priya Patel",
    authorRole: "HR Manager",
    priority: "high",
    isPinned: true,
    departments: [],
    date: "Feb 27, 2026",
    readCount: 98,
    totalEmployees: 127,
  },
  {
    id: "2",
    title: "New Health Insurance Provider Starting April 1st",
    content: "We are transitioning to HealthPlus as our insurance provider starting April 1st. All employees will receive new cards by March 20th. Please review the updated benefits package in the HR portal.",
    author: "Priya Patel",
    authorRole: "HR Manager",
    priority: "normal",
    isPinned: true,
    departments: [],
    date: "Feb 25, 2026",
    readCount: 72,
    totalEmployees: 127,
  },
  {
    id: "3",
    title: "Engineering Town Hall — March 10th at 3 PM",
    content: "Join us for the quarterly engineering town hall where we'll discuss the technology roadmap, upcoming architectural changes, and team growth plans. Link will be shared on Slack.",
    author: "Alex Thompson",
    authorRole: "CTO",
    priority: "normal",
    isPinned: false,
    departments: ["Engineering", "DevOps", "QA"],
    date: "Feb 24, 2026",
    readCount: 45,
    totalEmployees: 73,
  },
  {
    id: "4",
    title: "Q1 2026 Company Performance Review",
    content: "Great quarter everyone! Revenue is up 18% YoY. Our client satisfaction score reached 4.7/5. Special shoutout to the Client Portal team for delivering ahead of schedule. Full report available in the dashboard.",
    author: "CEO Office",
    authorRole: "Management",
    priority: "normal",
    isPinned: false,
    departments: [],
    date: "Feb 20, 2026",
    readCount: 115,
    totalEmployees: 127,
  },
  {
    id: "5",
    title: "Updated Remote Work Policy",
    content: "We've updated the remote work policy to allow up to 3 WFH days per week (up from 2). Please review and acknowledge the updated policy in the Documents section. Effective March 1st.",
    author: "Priya Patel",
    authorRole: "HR Manager",
    priority: "normal",
    isPinned: false,
    departments: [],
    date: "Feb 18, 2026",
    readCount: 108,
    totalEmployees: 127,
  },
];

const priorityBadge: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  normal: "bg-blue-100 text-blue-700",
  low: "bg-gray-100 text-gray-700",
};

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-[var(--muted-foreground)]">
            Company-wide updates and important notices.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors">
          <Plus className="h-4 w-4" />
          New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md ${
              announcement.isPinned ? "border-[var(--color-primary-200)]" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {announcement.isPinned && (
                  <Pin className="mt-0.5 h-4 w-4 text-[var(--color-primary-500)] rotate-45" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {announcement.title}
                    </h3>
                    {announcement.priority === "high" && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityBadge.high}`}>
                        Important
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {announcement.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                <div className="flex items-center gap-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--muted)] text-[10px] font-medium">
                    {announcement.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span>
                    {announcement.author} ({announcement.authorRole})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{announcement.date}</span>
                </div>
                {announcement.departments.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{announcement.departments.join(", ")}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">
                Read by {announcement.readCount}/{announcement.totalEmployees}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
