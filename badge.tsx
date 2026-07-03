export type Sport = "Cricket" | "Badminton" | "Karate" | "Silambam";

export type Batch = "Morning" | "Evening";

export type BookingStatus = "pending" | "approved" | "rejected";

export interface Booking {
  id: string;
  playerName: string;
  mobile: string;
  sport: Sport;
  slotLabel: string;
  day: "today" | "upcoming" | "past";
  status: BookingStatus;
}

export type PaymentStatus = "overdue" | "dueSoon" | "pending" | "paid";

export interface Player {
  id: string;
  name: string;
  mobile: string;
  sport: Sport;
  batch?: Batch;
  status: PaymentStatus;
  due: number;
  month: string;
  monthlyFee: number;
}

export interface PaymentRecord {
  id: string;
  playerId: string;
  amount: number;
  method: "Cash" | "UPI" | "Card";
  date: string;
}
