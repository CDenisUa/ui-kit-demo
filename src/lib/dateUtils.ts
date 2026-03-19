// Types
import type { Event } from '@/types/event';
import type { TimelineGroup } from '@/types/timeline';

export function groupEventsByDay(events: Event[]): Record<string, Event[]> {
  return events.reduce<Record<string, Event[]>>((acc, event) => {
    const dateKey = event.date.slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {});
}

export function formatDayLabel(dateKey: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateKey + 'T00:00:00'));
}

export function sortGroupsByDate(groups: TimelineGroup[]): TimelineGroup[] {
  return [...groups].sort((a, b) => a.dateKey.localeCompare(b.dateKey));
}
