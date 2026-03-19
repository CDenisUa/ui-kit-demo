// Core
import { create } from 'zustand';
// Types
import type { Event } from '@/types/event';
// Utils
import { MOCK_EVENTS } from '@/const/events';

interface EventStore {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, patch: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventStore>()((set) => ({
  events: MOCK_EVENTS,

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
}));
