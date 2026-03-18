import type {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';

export type DataGridStatus = 'idle' | 'loading' | 'error' | 'empty';

export interface DataGridState {
  pagination: PaginationState;
  sorting: SortingState;
  filters: ColumnFiltersState;
  globalFilter: string;
  status: DataGridStatus;
}
