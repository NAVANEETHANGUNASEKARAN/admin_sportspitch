import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type {
  Announcement,
  Booking,
  Player,
  SettingsState,
  SportsManagementState,
} from "@/types";

// Centralized app state. In production these setters would be replaced with
// mutations against the real API, but every component only depends on this
// shape -- so swapping mock state for real data fetching later does not
// touch any screen.

interface AppDataShape {
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  announcements: Announcement[];
  setAnnouncements: Dispatch<SetStateAction<Announcement[]>>;
  sportsManagement: SportsManagementState;
  setSportsManagement: Dispatch<SetStateAction<SportsManagementState>>;
  settings: SettingsState;
  setSettings: Dispatch<SetStateAction<SettingsState>>;
}

export const AppDataContext = createContext<AppDataShape | null>(null);

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataContext.Provider");
  return ctx;
}
