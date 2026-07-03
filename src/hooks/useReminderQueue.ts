import { useState } from "react";
import type { Player } from "@/types";
import { paymentReminderMessage, waLink } from "@/lib/whatsapp";

// Drives the "Remind all due" one-by-one flow: WhatsApp will not let a
// website fire off multiple chats silently, so the smoothest honest UX is
// stepping through the due players one at a time, each requiring a single
// tap to open that player's pre-filled chat.

export function useReminderQueue() {
  const [queue, setQueue] = useState<Player[] | null>(null);
  const [index, setIndex] = useState(0);

  function start(players: Player[]) {
    if (players.length === 0) return;
    setQueue(players);
    setIndex(0);
  }

  function next() {
    if (!queue) return;
    if (index + 1 >= queue.length) {
      setQueue(null);
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function cancel() {
    setQueue(null);
    setIndex(0);
  }

  const current = queue ? queue[index] : null;
  const currentLink = current ? waLink(current.mobile, paymentReminderMessage(current)) : null;

  return {
    isActive: !!queue,
    current,
    currentLink,
    position: index + 1,
    total: queue?.length ?? 0,
    start,
    next,
    cancel,
  };
}
