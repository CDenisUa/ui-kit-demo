// Core
import { memo, useRef, useEffect } from 'react';
// Types
import type { Event } from '@/types/event';
// Components
import { Badge } from '@/components/ui/badge';

const STATUS_VARIANT: Record<Event['status'], 'default' | 'secondary' | 'outline'> = {
  upcoming: 'outline',
  completed: 'default',
  cancelled: 'secondary',
};

interface TimelineItemProps {
  event: Event;
  isFocused: boolean;
  onFocus: () => void;
}

export const TimelineItem = memo(function TimelineItem({ event, isFocused, onFocus }: TimelineItemProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isFocused) ref.current?.focus();
  }, [isFocused]);

  const time = new Date(event.date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li
      ref={ref}
      role="listitem"
      tabIndex={isFocused ? 0 : -1}
      onFocus={onFocus}
      className="flex items-start gap-3 px-4 py-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-default"
    >
      <span className="mt-0.5 text-xs text-muted-foreground w-12 shrink-0 tabular-nums">{time}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug">{event.title}</p>
        {event.description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{event.description}</p>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Badge variant="outline" className="text-xs capitalize">{event.category}</Badge>
        <Badge variant={STATUS_VARIANT[event.status]} className="text-xs capitalize">{event.status}</Badge>
      </div>
    </li>
  );
});
