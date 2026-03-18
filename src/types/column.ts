export interface ColumnDef<T> {
  accessor: keyof T;
  label: string;
  hidden?: boolean;
  sortable?: boolean;
  filterable?: boolean;
}
