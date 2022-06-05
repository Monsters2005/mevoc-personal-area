import React, { RefObject, useEffect } from 'react';

export function useOutsideCheck<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void
): void {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const element = ref?.current;
      if (!element || element.contains(e.target as Node)) {
        return;
      }
      handler(e);
    };
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  }, [ref, handler]);
}
