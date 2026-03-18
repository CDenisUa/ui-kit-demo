// Core
import { create } from 'zustand';
// Types
import type { PaginationState, SortingState, ColumnFiltersState } from '@tanstack/react-table';
import type { DataGridStatus } from '@/types/dataGrid';

interface DataGridStore {
  pagination: PaginationState;
  sorting: SortingState;
  filters: ColumnFiltersState;
  globalFilter: string;
  status: DataGridStatus;
  setPagination: (pagination: PaginationState) => void;
  setSorting: (sorting: SortingState) => void;
  setFilters: (filters: ColumnFiltersState) => void;
  setGlobalFilter: (globalFilter: string) => void;
  setStatus: (status: DataGridStatus) => void;
}

export const useDataGridStore = create<DataGridStore>()((set) => ({
  pagination: { pageIndex: 0, pageSize: 20 },
  sorting: [],
  filters: [],
  globalFilter: '',
  status: 'idle',

  setPagination: (pagination) => set({ pagination }),
  setSorting: (sorting) => set({ sorting }),
  setFilters: (filters) => set({ filters }),
  setGlobalFilter: (globalFilter) => set({ globalFilter }),
  setStatus: (status) => set({ status }),
}));
