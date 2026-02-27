"use client";

import {
  Building2,
  Clock,
  Calendar,
  Bell,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-[var(--muted-foreground)]">
            Configure company-wide settings and policies.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary-600)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-700)] transition-colors"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Success Banner */}
      {saved && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
          Settings have been saved successfully.
        </div>
      )}

      <div className="space-y-8">
        {/* Company Information */}
        <section className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Company Information</h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Basic organization details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              icon={Building2}
              label="Company Name"
              defaultValue="Inovativex Pvt Ltd"
            />
            <FormField
              icon={Globe}
              label="Website"
              defaultValue="https://inovativex.com"
              type="url"
            />
            <FormField
              icon={Mail}
              label="Company Email"
              defaultValue="admin@inovativex.com"
              type="email"
            />
            <FormField
              icon={Phone}
              label="Phone"
              defaultValue="+1 (555) 000-1234"
              type="tel"
            />
            <div className="sm:col-span-2">
              <FormField
                icon={MapPin}
                label="Address"
                defaultValue="123 Innovation Drive, Suite 400, San Francisco, CA 94107"
              />
            </div>
            <FormField
              label="Tax ID / EIN"
              defaultValue="XX-XXXXXXX"
            />
            <FormField
              label="Industry"
              defaultValue="Information Technology"
            />
          </div>
        </section>

        {/* Working Hours */}
        <section className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Working Hours</h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Define standard work schedules
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Work Start Time
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="h-10 w-full rounded-lg border bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Work End Time
              </label>
              <input
                type="time"
                defaultValue="18:00"
                className="h-10 w-full rounded-lg border bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Working Days
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => (
                    <button
                      key={day}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        i < 5
                          ? "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                      }`}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>
            <FormField
              label="Hours Per Day"
              defaultValue="8"
              type="number"
            />
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Timezone
              </label>
              <select className="h-10 w-full rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
                <option value="America/Los_Angeles">
                  Pacific Time (PT) - UTC-8
                </option>
                <option value="America/Denver">
                  Mountain Time (MT) - UTC-7
                </option>
                <option value="America/Chicago">
                  Central Time (CT) - UTC-6
                </option>
                <option value="America/New_York">
                  Eastern Time (ET) - UTC-5
                </option>
                <option value="Asia/Kolkata">
                  India Standard Time (IST) - UTC+5:30
                </option>
              </select>
            </div>
            <FormField
              label="Overtime Multiplier"
              defaultValue="1.5x"
            />
          </div>
        </section>

        {/* Leave Policies */}
        <section className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Leave Policies</h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Configure leave allowances and rules
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              label="Annual Leave (days/year)"
              defaultValue="20"
              type="number"
            />
            <FormField
              label="Sick Leave (days/year)"
              defaultValue="10"
              type="number"
            />
            <FormField
              label="Casual Leave (days/year)"
              defaultValue="5"
              type="number"
            />
            <FormField
              label="WFH Days (days/month)"
              defaultValue="8"
              type="number"
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Leave Approval Required
              </label>
              <select className="h-10 w-full rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
                <option value="manager">Direct Manager</option>
                <option value="hr">HR Department</option>
                <option value="both">Manager + HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Carry Forward Policy
              </label>
              <select className="h-10 w-full rounded-lg border bg-[var(--background)] px-3 text-sm outline-none">
                <option value="partial">Up to 5 days carry forward</option>
                <option value="full">Full carry forward</option>
                <option value="none">No carry forward</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="rounded-xl border bg-[var(--card)] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Notification Preferences
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Control how system notifications are delivered
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              label="Leave Request Notifications"
              description="Notify managers when a team member submits a leave request"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Expense Approval Alerts"
              description="Send alerts when expense reports need approval"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Project Deadline Reminders"
              description="Remind team leads 3 days before project milestones"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Payroll Processing Alerts"
              description="Notify finance team when payroll is ready for processing"
              defaultChecked={false}
            />
            <NotificationToggle
              label="New Employee Onboarding"
              description="Send onboarding checklist to HR when a new employee is added"
              defaultChecked={true}
            />
            <NotificationToggle
              label="System Maintenance Alerts"
              description="Notify all users before scheduled system maintenance"
              defaultChecked={false}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FormField({
  icon: Icon,
  label,
  defaultValue,
  type = "text",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          className={`h-10 w-full rounded-lg border bg-[var(--background)] ${
            Icon ? "pl-9" : "pl-3"
          } pr-3 text-sm outline-none focus:border-[var(--color-primary-500)] focus:ring-1 focus:ring-[var(--color-primary-500)]`}
        />
      </div>
    </div>
  );
}

function NotificationToggle({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[var(--muted-foreground)]">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked
            ? "bg-[var(--color-primary-600)]"
            : "bg-[var(--muted)]"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
