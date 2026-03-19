// Core
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
// Types
import type { Event } from '@/types/event';
import type { EventFormValues, EventFormProps } from '@/types/eventForm';
// Components
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventFormField } from './EventFormField';
import { EventFormActions } from './EventFormActions';
// Hooks
import { useEventStore } from '@/store/useEventStore';

const schema = z.object({
  title:       z.string().min(1, 'Title is required'),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Invalid date'),
  category:    z.enum(['work', 'personal', 'meeting', 'other']),
  status:      z.enum(['upcoming', 'completed', 'cancelled']),
  description: z.string().optional(),
});

function buildDefaultValues(event?: Event): EventFormValues {
  return {
    title:       event?.title       ?? '',
    date:        event?.date        ? event.date.slice(0, 16) : '',
    category:    event?.category    ?? 'work',
    status:      event?.status      ?? 'upcoming',
    description: event?.description ?? '',
  };
}

export function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
  const { addEvent, updateEvent } = useEventStore();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<EventFormValues>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(event),
  });

  const onSubmit = (values: EventFormValues) => {
    let saved: Event;
    let message: string;
    if (event) {
      updateEvent(event.id, values);
      saved = { ...event, ...values };
      message = 'Event updated';
    } else {
      saved = { id: crypto.randomUUID(), ...values, description: values.description || undefined };
      addEvent(saved);
      message = 'Event created';
    }
    onSuccess(saved);
    setTimeout(() => toast.success(message), 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <EventFormField id="title" label="Title" error={errors.title?.message}>
        <Input id="title" {...register('title')} placeholder="Event title" />
      </EventFormField>

      <EventFormField id="date" label="Date & Time" error={errors.date?.message}>
        <Input id="date" type="datetime-local" {...register('date')} />
      </EventFormField>

      <EventFormField id="category" label="Category" error={errors.category?.message}>
        <Select defaultValue={event?.category ?? 'work'} onValueChange={(v) => setValue('category', v as EventFormValues['category'])}>
          <SelectTrigger id="category"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </EventFormField>

      <EventFormField id="status" label="Status" error={errors.status?.message}>
        <Select defaultValue={event?.status ?? 'upcoming'} onValueChange={(v) => setValue('status', v as EventFormValues['status'])}>
          <SelectTrigger id="status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </EventFormField>

      <EventFormField id="description" label="Description">
        <Textarea id="description" {...register('description')} placeholder="Optional description" rows={3} />
      </EventFormField>

      <EventFormActions isSubmitting={isSubmitting} onCancel={onCancel} />
    </form>
  );
}
