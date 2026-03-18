// Core
import { useState } from 'react';
// Components
import { DataGrid } from '@/components/DataGrid';
import { Timeline } from '@/components/Timeline';

type View = 'grid' | 'timeline';

export default function App() {
  const [view, setView] = useState<View>('grid');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Event Manager</h1>
          <div className="flex gap-2">
            <button onClick={() => setView('grid')}>Grid</button>
            <button onClick={() => setView('timeline')}>Timeline</button>
          </div>
        </div>
        {view === 'grid' ? <DataGrid /> : <Timeline />}
      </div>
    </div>
  );
}
