// Types
import type { Row } from '@tanstack/react-table';
import type { Event } from '@/types/event';
// Components
import { DataGridCell } from './DataGridCell';

interface DataGridRowProps {
  row: Row<Event>;
}

export function DataGridRow({ row }: DataGridRowProps) {
  return (
    <tr className="border-t hover:bg-muted/30 transition-colors">
      {row.getVisibleCells().map((cell) => (
        <DataGridCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
}
