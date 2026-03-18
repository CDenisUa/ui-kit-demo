// Core
import { useRef, useEffect } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
// Types
import type { Table } from '@tanstack/react-table';
import type { Event } from '@/types/event';
// Components
import { DataGridEmptyState } from './DataGridEmptyState';

interface DataGridTableProps {
  table: Table<Event>;
}

export function DataGridTable({ table }: DataGridTableProps) {
  const rows = table.getRowModel().rows;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pageIndex, pageSize } = table.getState().pagination;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pageIndex, pageSize]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 41,
    measureElement: (el) => el?.getBoundingClientRect().height,
    overscan: 5,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();
  const isEmpty = rows.length === 0 || table.getVisibleLeafColumns().length === 0;

  return (
    <div
      ref={scrollRef}
      className="flex-1 rounded-md border min-h-0"
      style={{ overflowY: 'scroll' }}
    >
      <table style={{ display: 'grid', width: '100%' }}>
        <thead
          className="bg-muted"
          style={{ display: 'grid', position: 'sticky', top: 0, zIndex: 10 }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2.5 text-left text-sm font-medium text-muted-foreground"
                  style={{ flex: `${header.getSize()} 1 0px`, minWidth: 0, overflow: 'hidden' }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            display: 'grid',
            position: 'relative',
            height: isEmpty ? undefined : `${totalSize}px`,
          }}
        >
          {isEmpty ? (
            <tr style={{ display: 'flex' }}>
              <td className="h-100" style={{ flex: 1 }}>
                <DataGridEmptyState />
              </td>
            </tr>
          ) : (
            virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className="border-t hover:bg-muted/30"
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2.5 text-sm"
                      style={{ flex: `${cell.column.getSize()} 1 0px`, minWidth: 0, overflow: 'hidden' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
