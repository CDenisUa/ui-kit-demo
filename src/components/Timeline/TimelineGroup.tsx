// Core
import { memo } from 'react';
// Types
import type { TimelineGroup as TimelineGroupType } from '@/types/timeline';
// Components
import { TimelineItem } from './TimelineItem';

interface TimelineGroupProps {
  group: TimelineGroupType;
  groupIndex: number;
  focusedGroupIndex: number;
  focusedItemIndex: number;
  onItemFocus: (groupIndex: number, itemIndex: number) => void;
}

export const TimelineGroup = memo(function TimelineGroup({
  group,
  groupIndex,
  focusedGroupIndex,
  focusedItemIndex,
  onItemFocus,
}: TimelineGroupProps) {
  return (
    <section aria-label={group.label}>
      <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider sticky top-0 bg-background z-10">
        {group.label}
      </h3>
      <ul role="list" className="divide-y divide-border">
        {group.events.map((event, itemIndex) => (
          <TimelineItem
            key={event.id}
            event={event}
            isFocused={groupIndex === focusedGroupIndex && itemIndex === focusedItemIndex}
            onFocus={() => onItemFocus(groupIndex, itemIndex)}
          />
        ))}
      </ul>
    </section>
  );
});
