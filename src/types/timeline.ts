// Types
import type { Event } from '@/types/event';

export interface TimelineGroup {
  dateKey: string;
  label: string;
  events: Event[];
}

export interface TimelineFocusState {
  groupIndex: number;
  itemIndex: number;
}

export interface TimelineAnnouncement {
  message: string;
  timestamp: number;
}
