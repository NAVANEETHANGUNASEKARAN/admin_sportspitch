import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Sport } from "@/types";

const tabs = ["Sports", "Batches", "Coaches", "Courts"] as const;
type Tab = (typeof tabs)[number];

export function SportsManagementPage() {
  const { sportsManagement, setSportsManagement } = useAppData();
  const [tab, setTab] = useState<Tab>("Sports");
  const [newItem, setNewItem] = useState("");

  function addSport() {
    if (!newItem.trim()) return;
    setSportsManagement((s) => ({ ...s, sports: [...s.sports, newItem.trim()] }));
    setNewItem("");
  }
  function addBatch() {
    if (!newItem.trim()) return;
    setSportsManagement((s) => ({ ...s, batches: [...s.batches, newItem.trim()] }));
    setNewItem("");
  }
  function addCoach() {
    if (!newItem.trim()) return;
    setSportsManagement((s) => ({
      ...s,
      coaches: [...s.coaches, { id: `c${Date.now()}`, name: newItem.trim(), sport: s.sports[0] as Sport }],
    }));
    setNewItem("");
  }
  function addCourt() {
    if (!newItem.trim()) return;
    setSportsManagement((s) => ({
      ...s,
      courts: [...s.courts, { id: `ct${Date.now()}`, name: newItem.trim(), available: true }],
    }));
    setNewItem("");
  }

  function removeSport(v: string) {
    setSportsManagement((s) => ({ ...s, sports: s.sports.filter((x) => x !== v) }));
  }
  function removeBatch(v: string) {
    setSportsManagement((s) => ({ ...s, batches: s.batches.filter((x) => x !== v) }));
  }
  function removeCoach(id: string) {
    setSportsManagement((s) => ({ ...s, coaches: s.coaches.filter((x) => x.id !== id) }));
  }
  function toggleCourt(id: string) {
    setSportsManagement((s) => ({
      ...s,
      courts: s.courts.map((c) => (c.id === id ? { ...c, available: !c.available } : c)),
    }));
  }
  function removeCourt(id: string) {
    setSportsManagement((s) => ({ ...s, courts: s.courts.filter((x) => x.id !== id) }));
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Link to="/more" aria-label="Back to more" className="text-ink-secondary">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">Sports management</h1>
      </div>

      <div className="mb-4 flex rounded-lg bg-surface-1 p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setNewItem("");
            }}
            className={cn(
              "flex-1 rounded-md py-2 text-xs font-medium transition-colors",
              tab === t ? "bg-surface-2 text-ink-primary shadow-sm" : "text-ink-muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-4 flex gap-2">
        <Input
          placeholder={`Add ${tab.toLowerCase().slice(0, -1)}`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button
          variant="primary"
          size="icon"
          onClick={
            tab === "Sports" ? addSport : tab === "Batches" ? addBatch : tab === "Coaches" ? addCoach : addCourt
          }
          aria-label="Add"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {tab === "Sports" && (
        <ListShell>
          {sportsManagement.sports.map((s) => (
            <ListRow key={s} label={s} onDelete={() => removeSport(s)} />
          ))}
        </ListShell>
      )}

      {tab === "Batches" && (
        <ListShell>
          {sportsManagement.batches.map((b) => (
            <ListRow key={b} label={b} onDelete={() => removeBatch(b)} />
          ))}
        </ListShell>
      )}

      {tab === "Coaches" && (
        <ListShell>
          {sportsManagement.coaches.map((c) => (
            <ListRow key={c.id} label={c.name} sublabel={c.sport} onDelete={() => removeCoach(c.id)} />
          ))}
        </ListShell>
      )}

      {tab === "Courts" && (
        <ListShell>
          {sportsManagement.courts.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3">
              <button onClick={() => toggleCourt(c.id)} className="flex items-center gap-2 text-left">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    c.available ? "bg-status-paid" : "bg-status-overdue"
                  )}
                />
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-xs text-ink-muted">
                  {c.available ? "Available" : "Unavailable"}
                </span>
              </button>
              <button onClick={() => removeCourt(c.id)} aria-label={`Remove ${c.name}`} className="text-ink-muted">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </ListShell>
      )}
    </div>
  );
}

function ListShell({ children }: { children: ReactNode }) {
  return <div className="divide-y divide-border rounded-lg border border-border bg-surface-2">{children}</div>;
}

function ListRow({
  label,
  sublabel,
  onDelete,
}: {
  label: string;
  sublabel?: string;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {sublabel && <p className="text-xs text-ink-secondary">{sublabel}</p>}
      </div>
      <button onClick={onDelete} aria-label={`Remove ${label}`} className="text-ink-muted">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
