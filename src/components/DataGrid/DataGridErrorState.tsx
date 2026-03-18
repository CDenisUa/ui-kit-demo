// Core
import { memo } from 'react';
import { AlertCircle } from 'lucide-react';

interface DataGridErrorStateProps {
  message?: string;
}

export const DataGridErrorState = memo(function DataGridErrorState({ message = 'Something went wrong' }: DataGridErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-destructive">
      <AlertCircle className="h-10 w-10 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
});
