// Core
import { useState } from 'react';
// Components
import { DataGrid } from '@/components/DataGrid';
import { Timeline } from '@/components/Timeline';
import { EventFormModal } from '@/components/EventForm';
import { Button } from '@/components/ui/button';
// Hooks
import { useModalStore } from '@/store/useModalStore';

type View = 'grid' | 'timeline';

export default function App() {
  const [view, setView] = useState<View>('grid');
  const openAdd = useModalStore((s) => s.openAdd);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Event Manager</h1>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md border overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-1.5 text-sm transition-colors ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('timeline')}
                className={`px-4 py-1.5 text-sm transition-colors ${view === 'timeline' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                Timeline
              </button>
            </div>
            <Button onClick={openAdd}>New Event</Button>
          </div>
        </div>
        {view === 'grid' ? <DataGrid /> : <Timeline />}
      </div>
      <EventFormModal />
    </div>
  );
}
