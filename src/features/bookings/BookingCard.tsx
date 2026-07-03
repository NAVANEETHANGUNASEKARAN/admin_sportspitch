import { useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import type { Booking } from "@/types";
import { bookingApprovedMessage, bookingRejectedMessage, waLink } from "@/lib/whatsapp";

interface Props {
  booking: Booking;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BookingCard({ booking, onApprove, onReject, onDelete }: Props) {
  const [pendingLink, setPendingLink] = useState<{ href: string; label: string } | null>(null);

  function handleApprove() {
    onApprove(booking.id);
    setPendingLink({ href: waLink(booking.mobile, bookingApprovedMessage(booking)), label: "Send confirmation on WhatsApp" });
  }

  function handleReject() {
    onReject(booking.id);
    setPendingLink({ href: waLink(booking.mobile, bookingRejectedMessage(booking)), label: "Send message on WhatsApp" });
  }

  function handleDelete() {
    if (window.confirm(`Delete booking for ${booking.playerName}?`)) {
      onDelete(booking.id);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{booking.playerName}</p>
          <p className="text-xs text-ink-secondary">
            {booking.sport} - {booking.slotLabel}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {booking.status === "pending" ? (
        <div className="flex gap-2">
          <Button variant="success" size="lg" className="flex-1" onClick={handleApprove}>
            <Check className="h-5 w-5" />
            Approve
          </Button>
          <Button variant="danger" size="lg" className="flex-1" onClick={handleReject}>
            <X className="h-5 w-5" />
            Reject
          </Button>
          <Button variant="outline" size="icon" className="h-14 w-14" onClick={handleDelete} aria-label="Delete booking">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="default" className="w-full" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      )}

      {pendingLink && (
        <a
          href={pendingLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-status-pending-bg px-3 py-2.5 text-sm font-medium text-status-pending"
        >
          {pendingLink.label}
        </a>
      )}
    </div>
  );
}
