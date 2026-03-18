// Core
import { memo } from 'react';
import { Inbox } from 'lucide-react';

export const DataGridEmptyState = memo(function DataGridEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <Inbox className="h-10 w-10 mb-3" />
      <p className="text-sm font-medium">No events found</p>
      <p className="text-xs mt-1">Try adjusting your filters</p>
    </div>
  );
});
