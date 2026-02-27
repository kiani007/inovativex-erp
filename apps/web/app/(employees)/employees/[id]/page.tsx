import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  User,
  Award,
  FileText,
  Clock,
  Edit,
} from "lucide-react";

export default function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // In production, fetch employee from Supabase using params.id
  const employee = {
    id: params.id,
    employeeId: "INX-001",
    name: "Sarah Chen",
    email: "sarah.chen@inovativex.com",
    phone: "+1 (555) 123-4567",
    designation: "Senior Software Engineer",
    department: "Engineering",
    manager: "Alex Thompson",
    status: "active",
    joinDate: "January 15, 2023",
    employmentType: "Full Time",
    location: "San Francisco, CA",
    dateOfBirth: "March 12, 1992",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
    leaveBalance: { annual: 12, sick: 8, casual: 3, wfh: 18 },
    timeline: [
      { date: "Jan 2026", event: "Promoted to Senior Engineer", type: "promoted" },
      { date: "Jul 2025", event: "Completed AWS Certification", type: "certification" },
      { date: "Jan 2024", event: "Role change: Mid → Senior", type: "role_change" },
      { date: "Jan 2023", event: "Joined Inovativex", type: "joined" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-2xl font-bold">
            SC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{employee.name}</h1>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                {employee.status}
              </span>
            </div>
            <p className="text-[var(--muted-foreground)]">
              {employee.designation} &bull; {employee.department}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              {employee.employeeId} &bull; Joined {employee.joinDate}
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-[var(--muted)] transition-colors">
          <Edit className="h-4 w-4" />
          Edit Profile
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Info */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={Mail} label="Email" value={employee.email} />
              <InfoItem icon={Phone} label="Phone" value={employee.phone} />
              <InfoItem icon={MapPin} label="Location" value={employee.location} />
              <InfoItem icon={Calendar} label="Date of Birth" value={employee.dateOfBirth} />
              <InfoItem icon={Building2} label="Department" value={employee.department} />
              <InfoItem icon={User} label="Manager" value={employee.manager} />
              <InfoItem icon={Clock} label="Employment Type" value={employee.employmentType} />
              <InfoItem icon={Calendar} label="Join Date" value={employee.joinDate} />
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Skills & Certifications</h2>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
                Skills
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {employee.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-[var(--muted)] px-3 py-1 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-[var(--muted-foreground)]">
                Certifications
              </h3>
              <div className="mt-2 space-y-2">
                {employee.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[var(--color-primary-500)]" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Timeline</h2>
            <div className="mt-4 space-y-4">
              {employee.timeline.map((event, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-primary-500)]" />
                    {i < employee.timeline.length - 1 && (
                      <div className="h-full w-px bg-[var(--border)]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Leave Balance */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Leave Balance</h2>
            <div className="mt-4 space-y-3">
              <LeaveBar label="Annual" used={8} total={20} color="bg-blue-500" />
              <LeaveBar label="Sick" used={2} total={10} color="bg-red-500" />
              <LeaveBar label="Casual" used={2} total={5} color="bg-orange-500" />
              <LeaveBar label="WFH" used={6} total={24} color="bg-purple-500" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border bg-[var(--card)] p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {[
                "View Attendance",
                "View Payslips",
                "Performance Review",
                "Assigned Assets",
                "Documents",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full rounded-lg border px-3 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-[var(--muted-foreground)]" />
      <div>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function LeaveBar({
  label,
  used,
  total,
  color,
}: {
  label: string;
  used: number;
  total: number;
  color: string;
}) {
  const remaining = total - used;
  const percentage = (used / total) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-[var(--muted-foreground)]">
          {remaining} / {total} remaining
        </span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-[var(--muted)]">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
