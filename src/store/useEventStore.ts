// Core
import { create } from 'zustand';
// Types
import type { Event } from '@/types/event';
import type { ColumnDef } from '@/types/column';
// Utils
import { DEFAULT_COLUMNS } from '@/const/columns';

interface EventStore {
  events: Event[];
  columns: ColumnDef<Event>[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, patch: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleColumnVisibility: (accessor: keyof Event) => void;
  setColumnLabel: (accessor: keyof Event, label: string) => void;
}

export const useEventStore = create<EventStore>()((set) => ({
  events: [],
  columns: DEFAULT_COLUMNS,

  addEvent: (event) =>
    set((state) => ({ events: [event, ...state.events] })),

  updateEvent: (id, patch) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  toggleColumnVisibility: (accessor) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.accessor === accessor ? { ...col, hidden: !col.hidden } : col
      ),
    })),

  setColumnLabel: (accessor, label) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.accessor === accessor ? { ...col, label } : col
      ),
    })),
}));
