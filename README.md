# Fork & Fire — Restaurant Admin

A no-login, admin-only restaurant menu and billing console built with Next.js (App Router),
TypeScript, Tailwind CSS, and Zustand.

## Pages

- `/` — animated landing screen introducing the restaurant name, with a button into the console
- `/dashboard` — stats overview, quick actions, recent bills, low-availability items
- `/menu` — add, edit, delete, search and filter menu items; add items straight to the cart
- `/cart` — adjust quantities, see live totals, preview and save a bill
- `/bills` — searchable bill history with view / edit / delete and summary stats
- `/settings` — restaurant name, currency symbol, and a reset-all-data option

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Data persistence

All data (menu items, cart, bills, settings) is kept in the browser's `localStorage` via a
Zustand store (`lib/store.ts`), so it survives page refreshes. There is no backend and no
authentication anywhere in the app, by design.

To wire this up to a real database later, replace the state-mutating functions inside
`lib/store.ts` with calls to your API — the rest of the app only talks to the store, so no
component changes should be needed.

## Project structure

```
app/                 routes (one folder per page)
components/          shared UI (Sidebar, TopBar, modals, form pieces)
components/ui/       small reusable primitives (Button, Modal, StatCard, chips…)
lib/                 store, types, formatting helpers, category metadata
data/                seed menu items shown on first run
```
