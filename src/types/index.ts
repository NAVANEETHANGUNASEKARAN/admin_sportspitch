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

export type PaymentStatus = "overdue" | "dueSoon" | "pending" | "paid" | "partiallyPaid";

export interface AttendanceSummary {
  present: number;
  total: number;
}

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
  photoUrl?: string;
  membershipType: "Monthly" | "Quarterly" | "Yearly";
  joinDate: string;
  amountPaid: number;
  paymentDate?: string;
  notes?: string;
  attendance?: AttendanceSummary;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  targetSport: Sport | "All";
  date: string;
  published: boolean;
}

export interface Coach {
  id: string;
  name: string;
  sport: Sport;
}

export interface Court {
  id: string;
  name: string;
  available: boolean;
}

export interface SportsManagementState {
  sports: string[];
  batches: string[];
  coaches: Coach[];
  courts: Court[];
}

export interface GeneralSettings {
  turfName: string;
  contactNumber: string;
  address: string;
}

export interface BusinessSettings {
  workingHours: string;
  bookingRules: string;
}

export interface PaymentSettings {
  upiId: string;
  bankDetails: string;
}

export interface NotificationSettings {
  whatsapp: boolean;
  email: boolean;
  push: boolean;
}

export interface AdminProfile {
  name: string;
  email: string;
  mobile: string;
  role: string;
  photoUrl?: string;
}

export interface SettingsState {
  general: GeneralSettings;
  business: BusinessSettings;
  payment: PaymentSettings;
  notifications: NotificationSettings;
  adminPin: string;
  profile: AdminProfile;
}
