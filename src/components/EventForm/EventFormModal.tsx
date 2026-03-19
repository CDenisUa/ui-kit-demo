// Components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventForm } from './EventForm';
// Hooks
import { useModalStore } from '@/store/useModalStore';

export function EventFormModal() {
  const { isOpen, editingEvent, close } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingEvent ? 'Edit Event' : 'New Event'}</DialogTitle>
        </DialogHeader>
        <EventForm
          event={editingEvent ?? undefined}
          onSuccess={close}
          onCancel={close}
        />
      </DialogContent>
    </Dialog>
  );
}
