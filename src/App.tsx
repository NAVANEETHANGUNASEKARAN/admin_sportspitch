import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { BookingsPage } from "@/features/bookings/BookingsPage";
import { PaymentsPage } from "@/features/payments/PaymentsPage";
import { PlayersPage } from "@/features/players/PlayersPage";
import { MorePage } from "@/features/more/MorePage";
import { initialBookings, initialPlayers } from "@/data/mockData";
import type { Booking, Player } from "@/types";
import { AppDataContext } from "@/hooks/useAppData";

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  return (
    <AppDataContext.Provider value={{ bookings, setBookings, players, setPlayers }}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="more" element={<MorePage />} />
        </Route>
      </Routes>
    </AppDataContext.Provider>
  );
}
