# Event Manager

**Live demo:** https://genetec-ui-kit-demo.vercel.app

---

## Requirements & Implementation

### 1. DataGrid

| Requirement | Status |
|---|---|
| Client-side pagination | ✅ |
| Client-side sorting | ✅ |
| Column filtering (global search + category + status) | ✅ |
| Loading state | ✅ |
| Empty state | ✅ |
| Error state | ✅ |
| Configurable columns — Hide / Show | ✅ |
| Configurable columns — Label | ✅ |
| Configurable columns — Accessor | ✅ |

### 2. Timeline

| Requirement | Status |
|---|---|
| Events grouped by day | ✅ |
| Keyboard navigation — Left / Right (between groups) | ✅ |
| Keyboard navigation — Up / Down (within group) | ✅ |
| Screen-reader announcements on focus change | ✅ `aria-live="polite"` via `TimelineAnnouncer` |

### 3. Form: Add / Edit Event

| Requirement | Status |
|---|---|
| Controlled inputs with validation | ✅ React Hook Form + Zod |
| Required title | ✅ |
| Valid date | ✅ |
| Shows validation messages | ✅ |
| Focuses first invalid field on submit | ✅ |
| Cancel / Save flow | ✅ |
| Success message region | ✅ `aria-live="polite"` via `EventFormSuccess` |

### App

| Requirement | Status |
|---|---|
| DataGrid with mock dataset (100–500 rows) | ✅ 200 events |
| Timeline rendering 30–100 events, grouped | ✅ |
| "New Event" button opens form | ✅ Modal |
| New event added to both Grid and Timeline | ✅ Shared Zustand store |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React 19 + TypeScript | — |
| Build | Vite | Fast dev server and build |
| State | Zustand | Minimal boilerplate, no context drilling |
| Table | TanStack Table v8 | Headless, full control over UI |
| Form | React Hook Form + Zod | Performant, schema-driven validation |
| UI | shadcn/ui + Tailwind CSS v4 | Accessible primitives, no design overhead |

---

## Architecture Notes

**State** — four separate stores (`useEventStore`, `useDataGridStore`, `useTimelineStore`, `useModalStore`). Each store owns one domain. Components subscribe only to what they need (ISP).

**Timeline grouping** — events are grouped by calendar day. Day is the most natural grouping for a general-purpose event list: it maps directly to how users think about their schedule. Left/Right navigates between days, Up/Down navigates within a day.

**DataGrid** — built on TanStack Table (headless). All column definitions live in `DataGrid.tsx`; the table engine handles sorting, filtering and pagination internally. Column visibility is toggled via the toolbar.

**Form** — `EventForm` is mode-agnostic: it receives an optional `event` prop. If present — edit mode, otherwise — add mode. The modal (`EventFormModal`) reads `useModalStore` and passes the right props down.

---

## Getting Started

**Requirements:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

App runs at `http://localhost:5173`
