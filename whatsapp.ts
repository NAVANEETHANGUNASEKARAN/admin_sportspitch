import { ChevronRight, Trophy, BarChart3, Megaphone, Settings, UserCircle } from "lucide-react";

const items = [
  { icon: Trophy, label: "Sports management" },
  { icon: BarChart3, label: "Reports" },
  { icon: Megaphone, label: "Announcements" },
  { icon: Settings, label: "Settings" },
  { icon: UserCircle, label: "Profile" },
];

export function MorePage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-semibold">More</h1>
      <div className="divide-y divide-border rounded-lg border border-border bg-surface-2">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center justify-between p-3.5 text-left"
          >
            <span className="flex items-center gap-3 text-sm">
              <Icon className="h-[18px] w-[18px] text-ink-secondary" />
              {label}
            </span>
            <ChevronRight className="h-4 w-4 text-ink-muted" />
          </button>
        ))}
      </div>
    </div>
  );
}
