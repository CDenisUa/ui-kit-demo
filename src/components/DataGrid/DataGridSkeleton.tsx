// Core
import { memo } from 'react';

const ROWS = Array.from({ length: 8 }, (_, i) => i);
const COLS = Array.from({ length: 5 }, (_, i) => i);

export const DataGridSkeleton = memo(function DataGridSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-10 bg-muted rounded mb-3" />
      <div className="rounded-md border overflow-hidden">
        <div className="bg-muted/50 px-3 py-2.5 flex gap-4">
          {COLS.map((col) => (
            <div key={col} className="h-4 bg-muted rounded flex-1" />
          ))}
        </div>
        {ROWS.map((row) => (
          <div key={row} className="flex gap-4 px-3 py-2.5 border-t">
            {COLS.map((col) => (
              <div key={col} className="h-4 bg-muted rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
