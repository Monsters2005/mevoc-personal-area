import { useEffect, useRef, useState } from 'react';

export function useSwiperRef<T extends HTMLElement>(): [
  T | null,
  React.Ref<T>
  ] {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);

  return [wrapper, ref];
}
