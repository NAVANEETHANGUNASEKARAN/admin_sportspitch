import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-surface-0">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
        <p className="text-[15px] font-semibold">
          SportsPitch <span className="font-normal text-ink-muted">admin</span>
        </p>
        <button aria-label="Notifications" className="text-ink-secondary">
          <Bell className="h-5 w-5" />
        </button>
      </header>
      <main className="flex-1 px-4 pb-24 pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
