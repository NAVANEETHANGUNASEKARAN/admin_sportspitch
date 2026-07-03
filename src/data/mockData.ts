import type { Booking, Player } from "@/types";

export const initialBookings: Booking[] = [
  { id: "b1", playerName: "Arun Kumar", mobile: "919876543210", sport: "Cricket", slotLabel: "Today, 6:00 PM", day: "today", status: "pending" },
  { id: "b2", playerName: "Priya S", mobile: "919876543211", sport: "Badminton", slotLabel: "Today, 7:00 AM", day: "today", status: "pending" },
  { id: "b3", playerName: "Karthik R", mobile: "919876543212", sport: "Karate", slotLabel: "Today, 5:00 PM", day: "today", status: "approved" },
  { id: "b4", playerName: "Divya M", mobile: "919876543213", sport: "Silambam", slotLabel: "Tomorrow, 6:30 AM", day: "upcoming", status: "pending" },
];

export const initialPlayers: Player[] = [
  { id: "p1", name: "Arun Kumar", mobile: "919876543210", sport: "Cricket", status: "overdue", due: 1500, month: "June", monthlyFee: 1500 },
  { id: "p2", name: "Priya S", mobile: "919876543211", sport: "Badminton", batch: "Morning", status: "dueSoon", due: 1200, month: "July", monthlyFee: 1200 },
  { id: "p3", name: "Karthik R", mobile: "919876543212", sport: "Karate", status: "paid", due: 0, month: "July", monthlyFee: 1000 },
  { id: "p4", name: "Divya M", mobile: "919876543213", sport: "Silambam", status: "pending", due: 1000, month: "July", monthlyFee: 1000 },
  { id: "p5", name: "Sanjay V", mobile: "919876543214", sport: "Badminton", batch: "Evening", status: "overdue", due: 2400, month: "May-June", monthlyFee: 1200 },
];

export const SPORTS = ["Cricket", "Badminton", "Karate", "Silambam"] as const;
