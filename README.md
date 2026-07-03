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

## Admin PIN and critical actions

`src/hooks/usePinGate.tsx` provides one global `requestPin(onSuccess)` used
everywhere a critical action needs authentication: deleting a player,
editing a payment, saving any Settings section, and changing the PIN
itself. Default PIN is `0000`, stored in `settings.adminPin` in
`useAppData` and changeable from Settings -> Security. This is in-memory
only (matches the rest of the mock state) -- wire it to your real backend
auth when you connect the API.

## New modules added

- **Player profile** (`features/players/PlayerProfileSheet.tsx`) - tapping
  a player row (not the delete icon) opens a full profile with photo
  placeholder, membership type, join date, attendance, and Edit/Delete
  actions. Delete is PIN-gated and then asks for confirmation.
- **Payments View/Edit** (`features/payments/PaymentViewSheet.tsx`,
  `PaymentEditSheet.tsx`) - View is open to everyone; Edit is PIN-gated
  and lets the admin change status (including the new "Partially paid"
  state), amount paid, balance, payment date, and notes.
- **Sports management, Reports, Announcements, Settings, Profile** - all
  live under `features/<module>` and are reachable from the More menu.
  Reports' Export Excel downloads a CSV (opens fine in Excel); Export PDF
  uses the browser's print-to-PDF via `window.print()` to avoid pulling in
  a heavy PDF library for a v1.

## Adding future modules (Attendance, QR check-in, Coach/Staff mgmt, etc.)

Add a new folder under `src/features`, a route in `App.tsx`, and a list
item in `MorePage.tsx` (or promote it to the bottom nav if it becomes a
daily task). Nothing else needs to change.
