import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { Player } from "@/types";

interface Props {
  player: Player;
  onSave: (playerId: string, amount: number, method: string) => void;
}

export function RecordPaymentSheet({ player, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(String(player.due));
  const [method, setMethod] = useState("Cash");

  function handleSave() {
    onSave(player.id, Number(amount) || 0, method);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          Record
        </Button>
      </SheetTrigger>
      <SheetContent title={`Record payment - ${player.name}`}>
        <label className="mb-1 block text-xs font-medium text-ink-secondary">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4"
        />
        <label className="mb-1 block text-xs font-medium text-ink-secondary">Method</label>
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="mb-6">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
            <SelectItem value="Card">Card</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="primary" size="lg" className="w-full" onClick={handleSave}>
          Save payment
        </Button>
      </SheetContent>
    </Sheet>
  );
}
