// Core
import { useMemo, useCallback } from 'react';
import { Inbox } from 'lucide-react';
// Types
import type { TimelineGroup as TimelineGroupType } from '@/types/timeline';
// Components
import { TimelineGroup } from './TimelineGroup';
import { TimelineAnnouncer } from './TimelineAnnouncer';
// Hooks
import { useEventStore } from '@/store/useEventStore';
import { useTimelineStore } from '@/store/useTimelineStore';
// Utils
import { groupEventsByDay, formatDayLabel, sortGroupsByDate } from '@/lib/dateUtils';

type NavContext = {
  groupIndex: number;
  itemIndex: number;
  groups: TimelineGroupType[];
};

type NavResult = { groupIndex: number; itemIndex: number; label: string } | null;

const NAV_HANDLERS: Record<string, (ctx: NavContext) => NavResult> = {
  ArrowDown: ({ groupIndex, itemIndex, groups }) => {
    const group = groups[groupIndex];
    if (itemIndex < group.events.length - 1)
      return { groupIndex, itemIndex: itemIndex + 1, label: group.events[itemIndex + 1].title };
    if (groupIndex < groups.length - 1)
      return { groupIndex: groupIndex + 1, itemIndex: 0, label: groups[groupIndex + 1].label };
    return null;
  },
  ArrowUp: ({ groupIndex, itemIndex, groups }) => {
    if (itemIndex > 0)
      return { groupIndex, itemIndex: itemIndex - 1, label: groups[groupIndex].events[itemIndex - 1].title };
    if (groupIndex > 0) {
      const prevGroup = groups[groupIndex - 1];
      return { groupIndex: groupIndex - 1, itemIndex: prevGroup.events.length - 1, label: prevGroup.label };
    }
    return null;
  },
  ArrowRight: ({ groupIndex, groups }) => {
    if (groupIndex < groups.length - 1)
      return { groupIndex: groupIndex + 1, itemIndex: 0, label: groups[groupIndex + 1].label };
    return null;
  },
  ArrowLeft: ({ groupIndex, groups }) => {
    if (groupIndex > 0)
      return { groupIndex: groupIndex - 1, itemIndex: 0, label: groups[groupIndex - 1].label };
    return null;
  },
};

export function Timeline() {
  const events = useEventStore((s) => s.events);
  const { focus, setFocus, announce } = useTimelineStore();

  const groups = useMemo<TimelineGroupType[]>(() => {
    const byDay = groupEventsByDay(events);
    const grouped = Object.entries(byDay).map(([dateKey, dayEvents]) => ({
      dateKey,
      label: formatDayLabel(dateKey),
      events: dayEvents,
    }));
    return sortGroupsByDate(grouped);
  }, [events]);

  const handleItemFocus = useCallback((groupIndex: number, itemIndex: number) => {
    setFocus(groupIndex, itemIndex);
  }, [setFocus]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const handler = NAV_HANDLERS[e.key];
    if (!handler || !groups[focus.groupIndex]) return;
    e.preventDefault();
    const result = handler({ ...focus, groups });
    if (result) {
      setFocus(result.groupIndex, result.itemIndex);
      announce(result.label);
    }
  }, [focus, groups, setFocus, announce]);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Inbox className="h-10 w-10 mb-3" />
        <p className="text-sm font-medium">No events found</p>
      </div>
    );
  }

  return (
    <div
      role="feed"
      aria-label="Events timeline"
      className="flex flex-col overflow-y-auto h-[calc(100vh-10rem)] rounded-md border"
      onKeyDown={handleKeyDown}
    >
      <TimelineAnnouncer />
      {groups.map((group, groupIndex) => (
        <TimelineGroup
          key={group.dateKey}
          group={group}
          groupIndex={groupIndex}
          focusedGroupIndex={focus.groupIndex}
          focusedItemIndex={focus.itemIndex}
          onItemFocus={handleItemFocus}
        />
      ))}
    </div>
  );
}
