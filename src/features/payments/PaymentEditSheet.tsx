import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { Player, PaymentStatus } from "@/types";

interface Props {
  player: Player | null;
  onClose: () => void;
  onSave: (player: Player) => void;
}

const statusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "partiallyPaid", label: "Partially paid" },
  { value: "overdue", label: "Overdue" },
];

export function PaymentEditSheet({ player, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Player | null>(player);

  useEffect(() => {
    setDraft(player);
  }, [player]);

  if (!player || !draft) return null;

  function handleSave() {
    if (!draft) return;
    onSave(draft);
    onClose();
  }

  return (
    <Sheet open={!!player} onOpenChange={(open) => !open && onClose()}>
      <SheetContent title={`Edit payment - ${player.name}`}>
        <label className="mb-1 block text-xs font-medium text-ink-secondary">Payment status</label>
        <Select
          value={draft.status}
          onValueChange={(v) => setDraft({ ...draft, status: v as PaymentStatus })}
        >
          <SelectTrigger className="mb-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Amount paid</label>
        <Input
          type="number"
          value={draft.amountPaid}
          onChange={(e) => setDraft({ ...draft, amountPaid: Number(e.target.value) || 0 })}
          className="mb-4"
        />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Balance amount</label>
        <Input
          type="number"
          value={draft.due}
          onChange={(e) => setDraft({ ...draft, due: Number(e.target.value) || 0 })}
          className="mb-4"
        />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Payment date</label>
        <Input
          type="date"
          value={draft.paymentDate ?? ""}
          onChange={(e) => setDraft({ ...draft, paymentDate: e.target.value })}
          className="mb-4"
        />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Notes</label>
        <Textarea
          value={draft.notes ?? ""}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          placeholder="Any additional notes"
          className="mb-6"
        />

        <Button variant="primary" size="lg" className="w-full" onClick={handleSave}>
          Save payment
        </Button>
      </SheetContent>
    </Sheet>
  );
}
