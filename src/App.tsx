import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { BookingsPage } from "@/features/bookings/BookingsPage";
import { PaymentsPage } from "@/features/payments/PaymentsPage";
import { PlayersPage } from "@/features/players/PlayersPage";
import { MorePage } from "@/features/more/MorePage";
import { SportsManagementPage } from "@/features/sports-management/SportsManagementPage";
import { ReportsPage } from "@/features/reports/ReportsPage";
import { AnnouncementsPage } from "@/features/announcements/AnnouncementsPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { ProfilePage } from "@/features/profile/ProfilePage";
import {
  initialAnnouncements,
  initialBookings,
  initialPlayers,
  initialSettings,
  initialSportsManagement,
} from "@/data/mockData";
import type { Announcement, Booking, Player, SettingsState, SportsManagementState } from "@/types";
import { AppDataContext } from "@/hooks/useAppData";
import { PinGateProvider } from "@/hooks/usePinGate";

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [sportsManagement, setSportsManagement] = useState<SportsManagementState>(initialSportsManagement);
  const [settings, setSettings] = useState<SettingsState>(initialSettings);

  return (
    <AppDataContext.Provider
      value={{
        bookings,
        setBookings,
        players,
        setPlayers,
        announcements,
        setAnnouncements,
        sportsManagement,
        setSportsManagement,
        settings,
        setSettings,
      }}
    >
      <PinGateProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="players" element={<PlayersPage />} />
            <Route path="more" element={<MorePage />} />
            <Route path="more/sports-management" element={<SportsManagementPage />} />
            <Route path="more/reports" element={<ReportsPage />} />
            <Route path="more/announcements" element={<AnnouncementsPage />} />
            <Route path="more/settings" element={<SettingsPage />} />
            <Route path="more/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </PinGateProvider>
    </AppDataContext.Provider>
  );
}
