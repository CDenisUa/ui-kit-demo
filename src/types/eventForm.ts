// Types
import type { Event, EventCategory, EventStatus } from '@/types/event';

export type EventFormMode = 'add' | 'edit';

export interface EventFormValues {
  title: string;
  date: string;
  category: EventCategory;
  status: EventStatus;
  description?: string;
}

export interface EventFormProps {
  event?: Event;
  onSuccess: (event: Event) => void;
  onCancel: () => void;
}
