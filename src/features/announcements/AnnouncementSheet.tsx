import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SPORTS } from "@/data/mockData";
import type { Announcement, Sport } from "@/types";
import type { ReactNode } from "react";

interface Props {
  announcement?: Announcement;
  trigger: ReactNode;
  onSave: (announcement: Announcement) => void;
}

export function AnnouncementSheet({ announcement, trigger, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(announcement?.title ?? "");
  const [description, setDescription] = useState(announcement?.description ?? "");
  const [targetSport, setTargetSport] = useState<Sport | "All">(announcement?.targetSport ?? "All");
  const [date, setDate] = useState(announcement?.date ?? new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (open) {
      setTitle(announcement?.title ?? "");
      setDescription(announcement?.description ?? "");
      setTargetSport(announcement?.targetSport ?? "All");
      setDate(announcement?.date ?? new Date().toISOString().slice(0, 10));
    }
  }, [open, announcement]);

  function handleSave() {
    if (!title.trim()) return;
    onSave({
      id: announcement?.id ?? `a${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      targetSport,
      date,
      published: announcement?.published ?? false,
    });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent title={announcement ? "Edit announcement" : "Create announcement"}>
        <label className="mb-1 block text-xs font-medium text-ink-secondary">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4" />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Target sport</label>
        <Select value={targetSport} onValueChange={(v) => setTargetSport(v as Sport | "All")}>
          <SelectTrigger className="mb-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All sports</SelectItem>
            {SPORTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label className="mb-1 block text-xs font-medium text-ink-secondary">Date</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mb-6" />

        <Button variant="primary" size="lg" className="w-full" onClick={handleSave}>
          Save announcement
        </Button>
      </SheetContent>
    </Sheet>
  );
}
