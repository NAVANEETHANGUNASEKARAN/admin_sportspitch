import { useState } from "react";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SPORTS } from "@/data/mockData";
import type { Batch, Player, Sport } from "@/types";

interface Props {
  onAdd: (player: Player) => void;
}

export function AddPlayerSheet({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [sport, setSport] = useState<Sport>("Cricket");
  const [batch, setBatch] = useState<Batch>("Morning");
  const [fee, setFee] = useState("1000");
  const [membershipType, setMembershipType] = useState<Player["membershipType"]>("Monthly");
  const [joinDate, setJoinDate] = useState(() => new Date().toISOString().slice(0, 10));

  function reset() {
    setName("");
    setMobile("");
    setSport("Cricket");
    setBatch("Morning");
    setFee("1000");
    setMembershipType("Monthly");
    setJoinDate(new Date().toISOString().slice(0, 10));
  }

  function handleSave() {
    if (!name.trim() || !mobile.trim()) return;
    onAdd({
      id: `p${Date.now()}`,
      name: name.trim(),
      mobile: mobile.trim(),
      sport,
      batch: sport === "Badminton" ? batch : undefined,
      status: "pending",
      due: Number(fee) || 0,
      month: "This month",
      monthlyFee: Number(fee) || 0,
      membershipType,
      joinDate,
      amountPaid: 0,
      attendance: { present: 0, total: 0 },
    });
    reset();
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Add player
        </Button>
      </SheetTrigger>
      <SheetContent title="Add player">
        <label className="mb-1 block text-xs font-medium text-ink-secondary">Name</label>
        <Input
          placeholder="Player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Mobile number</label>
        <Input
          placeholder="91XXXXXXXXXX"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mb-4"
        />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Sport</label>
        <Select value={sport} onValueChange={(v) => setSport(v as Sport)}>
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

        {sport === "Badminton" && (
          <>
            <label className="mb-1 block text-xs font-medium text-ink-secondary">Batch</label>
            <Select value={batch} onValueChange={(v) => setBatch(v as Batch)}>
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
        <Select value={membershipType} onValueChange={(v) => setMembershipType(v as Player["membershipType"])}>
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
        <Input type="date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} className="mb-4" />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Monthly fee</label>
        <Input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="mb-6"
        />

        <Button variant="primary" size="lg" className="w-full" onClick={handleSave}>
          Save player
        </Button>
      </SheetContent>
    </Sheet>
  );
}
