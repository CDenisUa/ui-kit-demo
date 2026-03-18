// Core
import { create } from 'zustand';
// Types
import type { TimelineFocusState, TimelineAnnouncement } from '@/types/timeline';

interface TimelineStore {
  focus: TimelineFocusState;
  announcement: TimelineAnnouncement;
  setFocus: (groupIndex: number, itemIndex: number) => void;
  announce: (message: string) => void;
}

export const useTimelineStore = create<TimelineStore>()((set) => ({
  focus: { groupIndex: 0, itemIndex: 0 },
  announcement: { message: '', timestamp: 0 },

  setFocus: (groupIndex, itemIndex) =>
    set({ focus: { groupIndex, itemIndex } }),

  announce: (message) =>
    set({ announcement: { message, timestamp: Date.now() } }),
}));
