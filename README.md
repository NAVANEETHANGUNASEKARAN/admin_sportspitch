# SportsPitch Admin Portal

Mobile-first admin portal for SportsPitch, built with React + TypeScript +
Vite + Tailwind CSS + shadcn/ui-style primitives + lucide-react icons.

## Run it

npm install
npm run dev

## Architecture

- `src/components/ui` - shadcn-style primitives (Button, Badge, Card, Input,
  Select, Sheet). Copy-in-your-repo style, not an npm dependency, so they're
  fully yours to restyle.
- `src/components/layout` - AppShell (header + routed content) and
  BottomNav (5-tab mobile navigation: Home, Bookings, Payments, Players,
  More).
- `src/features/<module>` - one folder per admin module (dashboard,
  bookings, payments, players, more). Each screen and its sub-components
  live together so a module can be extended or removed without touching
  others.
- `src/hooks/useAppData.ts` - single React context holding bookings and
  players in memory. Every screen reads/writes through this context, so
  swapping the mock state for real API calls (e.g. React Query + your
  backend) only means editing this one file's provider - no screen changes.
- `src/hooks/useReminderQueue.ts` - drives the "Remind all due" one-by-one
  WhatsApp flow.
- `src/lib/whatsapp.ts` - builds wa.me deep links and message text for
  booking approve/reject and payment reminders.
- `src/data/mockData.ts` - placeholder bookings/players. Replace with API
  calls when the backend is ready; shapes are defined in `src/types`.

## Important note on WhatsApp automation

Every "automatic" WhatsApp message in this build opens a pre-filled wa.me
chat that the admin sends with one tap inside WhatsApp - this is free and
needs no setup. WhatsApp does not allow a website to send a message with
zero human interaction. If you later want messages to go out with no tap
at all (e.g. triggered straight from your backend when a booking is
approved), that requires the WhatsApp Business API through a provider like
Meta Cloud API, Gupshup, or Twilio, which has setup and per-message cost.

## Adding future modules (Attendance, QR check-in, Coach/Staff mgmt, etc.)

Add a new folder under `src/features`, a route in `App.tsx`, and a list
item in `MorePage.tsx` (or promote it to the bottom nav if it becomes a
daily task). Nothing else needs to change.
