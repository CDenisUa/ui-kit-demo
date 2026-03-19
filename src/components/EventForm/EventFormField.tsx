// Types
import type { ReactNode } from 'react';
// Components
import { Label } from '@/components/ui/label';

interface EventFormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

export function EventFormField({ id, label, error, children }: EventFormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
