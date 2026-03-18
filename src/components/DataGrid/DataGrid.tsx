// Core
import { useState, useMemo, memo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
// Types
import type { Event } from '@/types/event';
// Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataGridToolbar } from './DataGridToolbar';
import { DataGridTable } from './DataGridTable';
import { DataGridPagination } from './DataGridPagination';
import { DataGridSkeleton } from './DataGridSkeleton';
import { DataGridErrorState } from './DataGridErrorState';
// Hooks
import { useEventStore } from '@/store/useEventStore';
import { useDataGridStore } from '@/store/useDataGridStore';
import { useModalStore } from '@/store/useModalStore';

const STATUS_VARIANT: Record<Event['status'], 'default' | 'secondary' | 'outline'> = {
  upcoming: 'outline',
  completed: 'default',
  cancelled: 'secondary',
};

export const DataGrid = memo(function DataGrid() {
  const { events, deleteEvent } = useEventStore();
  const { status } = useDataGridStore();
  const { openEdit } = useModalStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const sortableHeader = (label: string) => ({ column }: { column: import('@tanstack/react-table').Column<Event> }) => (
    <button
      className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {label} <ArrowUpDown className="h-3.5 w-3.5" />
    </button>
  );

  const columns = useMemo<ColumnDef<Event>[]>(() => [
    {
      id: 'index',
      size: 10,
      header: '#',
      cell: ({ row }) => (
        <div className="flex items-center h-full">
          <span className="text-muted-foreground">{row.index + 1}</span>
        </div>
      ),
    },
    {
      accessorKey: 'title',
      size: 308,
      header: sortableHeader('Title'),
    },
    {
      accessorKey: 'date',
      size: 140,
      header: sortableHeader('Date'),
      cell: ({ getValue }) => (
        <div className="flex items-center justify-center h-full">
          {new Date(getValue<string>()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      ),
      sortingFn: (a, b) => new Date(a.original.date).getTime() - new Date(b.original.date).getTime(),
    },
    {
      accessorKey: 'category',
      size: 120,
      header: 'Category',
      cell: ({ getValue }) => (
        <div className="flex items-center justify-center h-full">
          <span className="capitalize">{getValue<string>()}</span>
        </div>
      ),
      filterFn: (row, _id, value) => row.original.category === value,
    },
    {
      accessorKey: 'status',
      size: 120,
      header: 'Status',
      cell: ({ getValue }) => (
        <div className="flex items-center justify-center h-full">
          <Badge variant={STATUS_VARIANT[getValue<Event['status']>()]}>
            <span className="capitalize">{getValue<string>()}</span>
          </Badge>
        </div>
      ),
      filterFn: (row, _id, value) => row.original.status === value,
    },
    {
      accessorKey: 'description',
      size: 390,
      header: 'Description',
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">{getValue<string>() ?? '—'}</span>
      ),
    },
    {
      id: 'actions',
      size: 80,
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-1 h-full">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row.original)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteEvent(row.original.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ], [openEdit, deleteEvent]);

  const table = useReactTable({
    data: events,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 20 } },
    defaultColumn: { minSize: 60 },
  });

  if (status === 'loading') return <DataGridSkeleton />;
  if (status === 'error') return <DataGridErrorState />;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <DataGridToolbar table={table} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} />
      <DataGridTable table={table} />
      <DataGridPagination table={table} />
    </div>
  );
});
