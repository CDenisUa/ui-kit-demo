// Core
import { memo } from 'react';
// Hooks
import { useTimelineStore } from '@/store/useTimelineStore';

export const TimelineAnnouncer = memo(function TimelineAnnouncer() {
  const { message } = useTimelineStore((s) => s.announcement);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
});
