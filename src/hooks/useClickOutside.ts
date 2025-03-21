import { useEffect } from 'react';

export function useClickOutside<T extends HTMLDivElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled = false,
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, enabled]);
}
