"use client";

import { useState } from "react";
import {
  LogIn,
  LogOut,
  Clock,
  Users,
  UserX,
  Laptop,
  CalendarOff,
  Timer,
  MapPin,
} from "lucide-react";

const todayStats = [
  {
    label: "Present",
    value: 95,
    icon: Users,
    color: "bg-green-500",
  },
  {
    label: "Absent",
    value: 5,
    icon: UserX,
    color: "bg-red-500",
  },
  {
    label: "WFH",
    value: 15,
    icon: Laptop,
    color: "bg-blue-500",
  },
  {
    label: "On Leave",
    value: 12,
    icon: CalendarOff,
    color: "bg-orange-500",
  },
];

const weeklyAttendance = [
  {
    date: "Mon, Feb 23",
    clockIn: "09:02 AM",
    clockOut: "06:15 PM",
    hours: "9h 13m",
    status: "present",
  },
  {
    date: "Tue, Feb 24",
    clockIn: "08:55 AM",
    clockOut: "06:30 PM",
    hours: "9h 35m",
    status: "present",
  },
  {
    date: "Wed, Feb 25",
    clockIn: "09:10 AM",
    clockOut: "06:00 PM",
    hours: "8h 50m",
    status: "present",
  },
  {
    date: "Thu, Feb 26",
    clockIn: "09:00 AM",
    clockOut: "06:45 PM",
    hours: "9h 45m",
    status: "present",
  },
  {
    date: "Fri, Feb 27",
    clockIn: "09:00 AM",
    clockOut: "--:-- --",
    hours: "In Progress",
    status: "in_progress",
  },
];

const attendanceStatusBadge: Record<string, string> = {
  present: "bg-green-100 text-green-700",
  absent: "bg-red-100 text-red-700",
  half_day: "bg-yellow-100 text-yellow-700",
  wfh: "bg-blue-100 text-blue-700",
  in_progress: "bg-blue-100 text-blue-700",
  weekend: "bg-gray-100 text-gray-500",
};

export default function AttendancePage() {
  const [isClockedIn, setIsClockedIn] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-[var(--muted-foreground)]">
          Track your daily attendance and working hours.
        </p>
      </div>

      {/* Clock In / Clock Out Section */}
      <div className="rounded-xl border bg-[var(--card)] p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Current Status */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <p className="text-lg font-semibold text-green-600">
                  Clocked In
                </p>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Since 09:00 AM &bull; 6h 32m today
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <MapPin className="h-3 w-3" />
                Office - Floor 3, San Francisco
              </div>
            </div>
          </div>

          {/* Clock In/Out Buttons */}
          <div className="flex items-center gap-3">
            {isClockedIn ? (
              <button
                onClick={() => setIsClockedIn(false)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                <LogOut className="h-5 w-5" />
                Clock Out
              </button>
            ) : (
              <button
                onClick={() => setIsClockedIn(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
              >
                <LogIn className="h-5 w-5" />
                Clock In
              </button>
            )}
          </div>
        </div>

        {/* Today's Timer Bar */}
        <div className="mt-6 flex items-center gap-3">
          <Timer className="h-4 w-4 text-[var(--muted-foreground)]" />
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
              <span>09:00 AM</span>
              <span>Target: 8h 00m</span>
              <span>06:00 PM</span>
            </div>
            <div className="mt-1 h-2.5 rounded-full bg-[var(--muted)]">
              <div
                className="h-full rounded-full bg-[var(--color-primary-600)] transition-all"
                style={{ width: "81%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {todayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-[var(--card)] p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                Today&apos;s count
              </p>
            </div>
          );
        })}
      </div>

      {/* Weekly Attendance Table */}
      <div className="rounded-xl border bg-[var(--card)]">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">This Week</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Feb 23 - Feb 27, 2026
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-[var(--muted-foreground)]">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Clock In</th>
                <th className="px-4 py-3 font-medium">Clock Out</th>
                <th className="px-4 py-3 font-medium">Hours</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {weeklyAttendance.map((day) => (
                <tr
                  key={day.date}
                  className="border-b last:border-0 hover:bg-[var(--muted)] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{day.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <LogIn className="h-3.5 w-3.5 text-green-500" />
                      {day.clockIn}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <LogOut className="h-3.5 w-3.5 text-red-500" />
                      {day.clockOut}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        day.status === "in_progress"
                          ? "text-[var(--color-primary-600)] font-medium"
                          : ""
                      }
                    >
                      {day.hours}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${attendanceStatusBadge[day.status]}`}
                    >
                      {day.status === "in_progress"
                        ? "In Progress"
                        : day.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Weekly Summary */}
        <div className="border-t px-6 py-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div>
              <span className="text-[var(--muted-foreground)]">
                Total Hours:{" "}
              </span>
              <span className="font-semibold">37h 23m</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">Average: </span>
              <span className="font-semibold">9h 21m / day</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">
                On Time Arrival:{" "}
              </span>
              <span className="font-semibold text-green-600">80%</span>
            </div>
            <div>
              <span className="text-[var(--muted-foreground)]">
                Days Present:{" "}
              </span>
              <span className="font-semibold">5 / 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
