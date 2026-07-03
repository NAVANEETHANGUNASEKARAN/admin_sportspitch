import { useEffect, useState } from "react";
import { Phone, Trophy, Users2, CreditCard, CalendarDays, ClipboardCheck } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { usePinGate } from "@/hooks/usePinGate";
import { SPORTS } from "@/data/mockData";
import type { Batch, Player, Sport } from "@/types";
import { Avatar } from "@/components/ui/avatar";

interface Props {
  player: Player | null;
  onClose: () => void;
  onSave: (player: Player) => void;
  onDelete: (playerId: string) => void;
}

export function PlayerProfileSheet({ player, onClose, onSave, onDelete }: Props) {
  const { requestPin } = usePinGate();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draft, setDraft] = useState<Player | null>(player);

  useEffect(() => {
    setDraft(player);
    setMode("view");
  }, [player]);

  if (!player || !draft) return null;

  function handleDeleteClick() {
    requestPin(() => setConfirmOpen(true));
  }

  function confirmDelete() {
    onDelete(player!.id);
    setConfirmOpen(false);
    onClose();
  }

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    setMode("view");
  }

  return (
    <>
      <Sheet open={!!player} onOpenChange={(open) => !open && onClose()}>
        <SheetContent title={mode === "view" ? "Player profile" : "Edit player"}>
          {mode === "view" ? (
            <>
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={player.name} photoUrl={player.photoUrl} size={56} />
                <div>
                  <p className="text-base font-semibold">{player.name}</p>
                  <StatusBadge status={player.status} />
                </div>
              </div>

              <div className="mb-5 divide-y divide-border rounded-lg border border-border">
                <ProfileRow icon={Phone} label="Mobile number" value={player.mobile} />
                <ProfileRow icon={Trophy} label="Sport" value={player.sport} />
                <ProfileRow icon={Users2} label="Batch" value={player.batch ?? "Not applicable"} />
                <ProfileRow icon={CreditCard} label="Membership type" value={player.membershipType} />
                <ProfileRow icon={CalendarDays} label="Join date" value={player.joinDate} />
                <ProfileRow
                  icon={CreditCard}
                  label="Payment status"
                  value={`${player.status === "paid" ? "Paid" : formatCurrency(player.due) + " due"}`}
                />
                {player.attendance && (
                  <ProfileRow
                    icon={ClipboardCheck}
                    label="Attendance"
                    value={`${player.attendance.present} / ${player.attendance.total} sessions`}
                  />
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setMode("edit")}>
                  Edit player
                </Button>
                <Button variant="danger" className="flex-1" onClick={handleDeleteClick}>
                  Delete player
                </Button>
              </div>
            </>
          ) : (
            <>
              <label className="mb-1 block text-xs font-medium text-ink-secondary">Name</label>
              <Input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="mb-4"
              />

              <label className="mb-1 block text-xs font-medium text-ink-secondary">Mobile number</label>
              <Input
                value={draft.mobile}
                onChange={(e) => setDraft({ ...draft, mobile: e.target.value })}
                className="mb-4"
              />

              <label className="mb-1 block text-xs font-medium text-ink-secondary">Sport</label>
              <Select value={draft.sport} onValueChange={(v) => setDraft({ ...draft, sport: v as Sport })}>
                <SelectTrigger className="mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SPORTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {draft.sport === "Badminton" && (
                <>
                  <label className="mb-1 block text-xs font-medium text-ink-secondary">Batch</label>
                  <Select
                    value={draft.batch ?? "Morning"}
                    onValueChange={(v) => setDraft({ ...draft, batch: v as Batch })}
                  >
                    <SelectTrigger className="mb-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning">Morning</SelectItem>
                      <SelectItem value="Evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}

              <label className="mb-1 block text-xs font-medium text-ink-secondary">Membership type</label>
              <Select
                value={draft.membershipType}
                onValueChange={(v) => setDraft({ ...draft, membershipType: v as Player["membershipType"] })}
              >
                <SelectTrigger className="mb-4">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>

              <label className="mb-1 block text-xs font-medium text-ink-secondary">Join date</label>
              <Input
                type="date"
                value={draft.joinDate}
                onChange={(e) => setDraft({ ...draft, joinDate: e.target.value })}
                className="mb-6"
              />

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setMode("view")}>
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1" onClick={handleSave}>
                  Save changes
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this player?"
        description="Are you sure you want to delete this player? This can't be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between p-3">
      <span className="flex items-center gap-2 text-sm text-ink-secondary">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
