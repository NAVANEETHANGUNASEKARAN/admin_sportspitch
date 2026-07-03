import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Booking, Player } from "@/types";

// Centralized app state. In production this context's setters would be
// replaced with mutations against the real API (see ARCHITECTURE.md), but
// every component below only depends on this shape -- so swapping mock
// state for real data fetching later does not touch any screen.

interface AppDataShape {
  bookings: Booking[];
  setBookings: Dispatch<SetStateAction<Booking[]>>;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}

export const AppDataContext = createContext<AppDataShape | null>(null);

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataContext.Provider");
  return ctx;
}
