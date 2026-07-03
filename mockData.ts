import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SPORTS } from "@/data/mockData";
import { AddPlayerSheet } from "./AddPlayerSheet";

export function PlayersPage() {
  const { players, setPlayers } = useAppData();
  const [query, setQuery] = useState("");
  const [sportFilter, setSportFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesSport = !sportFilter || p.sport === sportFilter;
      return matchesQuery && matchesSport;
    });
  }, [players, query, sportFilter]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Players</h1>
        <AddPlayerSheet onAdd={(player) => setPlayers((prev) => [player, ...prev])} />
      </div>

      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <Input
          placeholder="Search players"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={sportFilter === null} onClick={() => setSportFilter(null)}>
          All
        </FilterChip>
        {SPORTS.map((s) => (
          <FilterChip key={s} active={sportFilter === s} onClick={() => setSportFilter(s)}>
            {s}
          </FilterChip>
        ))}
      </div>

      <div className="divide-y divide-border rounded-lg border border-border bg-surface-2">
        {filtered.length === 0 && (
          <p className="p-4 text-center text-sm text-ink-muted">No players found.</p>
        )}
        {filtered.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-ink-secondary">
                {p.sport}
                {p.batch ? ` - ${p.batch}` : ""}
              </p>
            </div>
            <StatusBadge status={p.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium",
        active
          ? "border-brand-500 bg-brand-50 text-brand-600"
          : "border-border bg-surface-2 text-ink-secondary"
      )}
    >
      {children}
    </button>
  );
}
