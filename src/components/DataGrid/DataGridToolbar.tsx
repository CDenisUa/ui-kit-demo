// Core
import { Search, SlidersHorizontal } from 'lucide-react';
// Types
import type { Table } from '@tanstack/react-table';
import type { Event } from '@/types/event';
// Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataGridToolbarProps {
  table: Table<Event>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export function DataGridToolbar({ table, globalFilter, onGlobalFilterChange }: DataGridToolbarProps) {
  const getFilter = (col: string) =>
    (table.getColumn(col)?.getFilterValue() as string) ?? 'all';

  const setFilter = (col: string, value: string) =>
    table.getColumn(col)?.setFilterValue(value === 'all' ? undefined : value);

  return (
    <div className="flex flex-wrap items-center gap-3 pb-3">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={getFilter('category')} onValueChange={(v) => setFilter('category', v)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="meeting">Meeting</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Select value={getFilter('status')} onValueChange={(v) => setFilter('status', v)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-1 ml-auto">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-1" />
        {table.getAllLeafColumns().map((col) => (
          <Button
            key={col.id}
            variant={col.getIsVisible() ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => col.toggleVisibility()}
            className="capitalize text-xs h-7"
          >
            {col.id}
          </Button>
        ))}
      </div>
    </div>
  );
}
