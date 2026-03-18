// Types
import type { Event } from '@/types/event';
import type { ColumnDef } from '@/types/column';

export const DEFAULT_COLUMNS: ColumnDef<Event>[] = [
  { accessor: 'title',       label: 'Title',       sortable: true,  filterable: true  },
  { accessor: 'date',        label: 'Date',        sortable: true,  filterable: false },
  { accessor: 'category',    label: 'Category',    sortable: false, filterable: true  },
  { accessor: 'status',      label: 'Status',      sortable: false, filterable: true  },
  { accessor: 'description', label: 'Description', sortable: false, filterable: false },
];
