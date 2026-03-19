// Components
import { Button } from '@/components/ui/button';

interface EventFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function EventFormActions({ isSubmitting, onCancel }: EventFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save'}
      </Button>
    </div>
  );
}
