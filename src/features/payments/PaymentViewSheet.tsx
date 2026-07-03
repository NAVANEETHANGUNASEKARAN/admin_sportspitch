import type { ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Player } from "@/types";

export function PaymentViewSheet({
  player,
  onClose,
}: {
  player: Player | null;
  onClose: () => void;
}) {
  if (!player) return null;

  return (
    <Sheet open={!!player} onOpenChange={(open) => !open && onClose()}>
      <SheetContent title={`Payment - ${player.name}`}>
        <div className="divide-y divide-border rounded-lg border border-border">
          <Row label="Status" value={<StatusBadge status={player.status} />} />
          <Row label="Amount paid" value={formatCurrency(player.amountPaid)} />
          <Row label="Balance amount" value={formatCurrency(player.due)} />
          <Row label="Payment date" value={player.paymentDate ?? "Not recorded"} />
          <Row label="Month" value={player.month} />
          <Row label="Notes" value={player.notes || "No notes"} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3">
      <span className="text-sm text-ink-secondary">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
