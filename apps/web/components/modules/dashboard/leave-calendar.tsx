const onLeave = [
  { name: "Alex Thompson", type: "Annual Leave", days: "Feb 27 - Mar 2", avatar: "AT" },
  { name: "Lisa Wang", type: "WFH", days: "Today", avatar: "LW" },
  { name: "Carlos Martinez", type: "Sick Leave", days: "Today", avatar: "CM" },
];

const upcoming = [
  { name: "Nina Patel", type: "Annual Leave", days: "Mar 3 - Mar 7", avatar: "NP" },
  { name: "Tom Harris", type: "WFH", days: "Mar 3", avatar: "TH" },
];

export function LeaveCalendar() {
  return (
    <div className="rounded-xl border bg-[var(--card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Who&apos;s Out</h3>
        <button className="text-sm text-[var(--color-primary-600)] hover:underline">
          View calendar
        </button>
      </div>

      {/* Currently Out */}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase text-[var(--muted-foreground)]">
          Today ({onLeave.length} out)
        </p>
        <div className="mt-2 space-y-2">
          {onLeave.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-medium">
                {person.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{person.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {person.type}
                </p>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {person.days}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="mt-4 border-t pt-4">
        <p className="text-xs font-medium uppercase text-[var(--muted-foreground)]">
          Upcoming
        </p>
        <div className="mt-2 space-y-2">
          {upcoming.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-medium">
                {person.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{person.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {person.type}
                </p>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {person.days}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
