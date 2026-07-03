import type {
  Announcement,
  Booking,
  Coach,
  Court,
  Player,
  SettingsState,
  SportsManagementState,
} from "@/types";

export const initialBookings: Booking[] = [
  { id: "b1", playerName: "Arun Kumar", mobile: "919876543210", sport: "Cricket", slotLabel: "Today, 6:00 PM", day: "today", status: "pending" },
  { id: "b2", playerName: "Priya S", mobile: "919876543211", sport: "Badminton", slotLabel: "Today, 7:00 AM", day: "today", status: "pending" },
  { id: "b3", playerName: "Karthik R", mobile: "919876543212", sport: "Karate", slotLabel: "Today, 5:00 PM", day: "today", status: "approved" },
  { id: "b4", playerName: "Divya M", mobile: "919876543213", sport: "Silambam", slotLabel: "Tomorrow, 6:30 AM", day: "upcoming", status: "pending" },
];

export const initialPlayers: Player[] = [
  { id: "p1", name: "Arun Kumar", mobile: "919876543210", sport: "Cricket", status: "overdue", due: 1500, month: "June", monthlyFee: 1500, membershipType: "Monthly", joinDate: "2026-01-12", amountPaid: 0, attendance: { present: 9, total: 12 } },
  { id: "p2", name: "Priya S", mobile: "919876543211", sport: "Badminton", batch: "Morning", status: "dueSoon", due: 1200, month: "July", monthlyFee: 1200, membershipType: "Monthly", joinDate: "2026-02-03", amountPaid: 0, attendance: { present: 11, total: 12 } },
  { id: "p3", name: "Karthik R", mobile: "919876543212", sport: "Karate", status: "paid", due: 0, month: "July", monthlyFee: 1000, membershipType: "Quarterly", joinDate: "2025-11-20", amountPaid: 1000, paymentDate: "2026-07-01", attendance: { present: 10, total: 10 } },
  { id: "p4", name: "Divya M", mobile: "919876543213", sport: "Silambam", status: "pending", due: 1000, month: "July", monthlyFee: 1000, membershipType: "Monthly", joinDate: "2026-03-15", amountPaid: 0, attendance: { present: 6, total: 8 } },
  { id: "p5", name: "Sanjay V", mobile: "919876543214", sport: "Badminton", batch: "Evening", status: "overdue", due: 2400, month: "May-June", monthlyFee: 1200, membershipType: "Monthly", joinDate: "2025-09-08", amountPaid: 0, attendance: { present: 14, total: 20 } },
];

export const SPORTS = ["Cricket", "Badminton", "Karate", "Silambam"] as const;

export const initialAnnouncements: Announcement[] = [
  { id: "a1", title: "Turf closed for maintenance", description: "The cricket turf will be closed on July 10 for resurfacing.", targetSport: "Cricket", date: "2026-07-10", published: true },
  { id: "a2", title: "New badminton evening batch", description: "A new 7-8 PM evening batch is open for enrollment.", targetSport: "Badminton", date: "2026-07-05", published: false },
];

export const initialSportsManagement: SportsManagementState = {
  sports: ["Cricket", "Badminton", "Karate", "Silambam"],
  batches: ["Morning", "Evening"],
  coaches: [
    { id: "c1", name: "Coach Ravi", sport: "Cricket" },
    { id: "c2", name: "Coach Meena", sport: "Badminton" },
    { id: "c3", name: "Coach Suresh", sport: "Karate" },
  ],
  courts: [
    { id: "ct1", name: "Turf A", available: true },
    { id: "ct2", name: "Turf B", available: true },
    { id: "ct3", name: "Badminton court 1", available: false },
  ],
};

export const initialSettings: SettingsState = {
  general: { turfName: "SportsPitch Arena", contactNumber: "919876500000", address: "Mulbagal, Karnataka" },
  business: { workingHours: "6:00 AM - 10:00 PM", bookingRules: "Cancellations allowed up to 2 hours before slot." },
  payment: { upiId: "sportspitch@upi", bankDetails: "HDFC Bank, A/C 000111222333" },
  notifications: { whatsapp: true, email: false, push: true },
  adminPin: "0000",
  profile: { name: "Naveen", email: "naveen@sportspitch.in", mobile: "919876500000", role: "Owner / Admin" },
};
