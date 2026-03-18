export type EventCategory = 'work' | 'personal' | 'meeting' | 'other';
export type EventStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  date: string;
  category: EventCategory;
  status: EventStatus;
  description?: string;
}
