import { MessageCircle } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { useReminderQueue } from "@/hooks/useReminderQueue";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { paymentReminderMessage, waLink } from "@/lib/whatsapp";
import type { Player, PaymentStatus } from "@/types";
import { RecordPaymentSheet } from "./RecordPaymentSheet";
import { ReminderQueueSheet } from "./ReminderQueueSheet";

const groupOrder: { key: PaymentStatus; label: string }[] = [
  { key: "overdue", label: "Overdue" },
  { key: "dueSoon", label: "Due soon" },
  { key: "pending", label: "Pending" },
  { key: "paid", label: "Paid" },
];

export function PaymentsPage() {
  const { players, setPlayers } = useAppData();
  const reminderQueue = useReminderQueue();

  function recordPayment(playerId: string, amount: number, _method: string) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, status: "paid", due: 0 } : p))
    );
  }

  const dueList = players.filter((p) => p.status !== "paid");

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Payments</h1>
        <Button variant="whatsapp" size="sm" onClick={() => reminderQueue.start(dueList)}>
          <MessageCircle className="h-4 w-4" />
          Remind all due
        </Button>
      </div>

      {groupOrder.map(({ key, label }) => {
        const list = players.filter((p) => p.status === key);
        if (list.length === 0) return null;
        return (
          <div key={key} className="mb-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
              {label}
            </p>
            <div className="divide-y divide-border rounded-lg border border-border bg-surface-2">
              {list.map((p) => (
                <PaymentRow key={p.id} player={p} onSave={recordPayment} />
              ))}
            </div>
          </div>
        );
      })}

      <ReminderQueueSheet queue={reminderQueue} />
    </div>
  );
}

function PaymentRow({
  player,
  onSave,
}: {
  player: Player;
  onSave: (playerId: string, amount: number, method: string) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3">
      <div>
        <p className="text-sm font-medium">{player.name}</p>
        <p className="text-xs text-ink-secondary">
          {player.sport}
          {player.due > 0 ? ` - ${formatCurrency(player.due)} - ${player.month}` : ""}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {player.due > 0 && (
          <Button asChild variant="whatsapp" size="icon" className="rounded-full h-9 w-9">
            <a
              href={waLink(player.mobile, paymentReminderMessage(player))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Send reminder to ${player.name}`}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        )}
        {player.due > 0 ? (
          <RecordPaymentSheet player={player} onSave={onSave} />
        ) : (
          <span className="px-3 text-xs text-ink-muted">Paid</span>
        )}
      </div>
    </div>
  );
}
