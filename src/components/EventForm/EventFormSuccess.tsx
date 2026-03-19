// Core
import { useEffect, useState } from 'react';

interface EventFormSuccessProps {
  visible: boolean;
}

export function EventFormSuccess({ visible }: EventFormSuccessProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!visible) return;
    setMessage('Event saved successfully');
    const timer = setTimeout(() => setMessage(''), 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-green-600 min-h-[1.25rem]">
      {message}
    </p>
  );
}
