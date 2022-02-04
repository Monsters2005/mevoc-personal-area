import { useState } from 'react';

export function useOffset(length: number, defaultIndex: number) {
  const getOffset = (i: number) => `${(100 / length) * i}%`;

  const [offset, setOffset] = useState(getOffset(defaultIndex));
  return {
    offset,
    recalcOffset: (index: number) => {
      setOffset(() => getOffset(index));
    },
  };
}
