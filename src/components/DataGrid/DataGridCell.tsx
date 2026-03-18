// Core
import { flexRender } from '@tanstack/react-table';
// Types
import type { Cell } from '@tanstack/react-table';
import type { Event } from '@/types/event';

interface DataGridCellProps {
  cell: Cell<Event, unknown>;
}

export function DataGridCell({ cell }: DataGridCellProps) {
  return (
    <td className="px-3 py-2.5 text-sm">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
