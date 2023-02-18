import { useEffect, useState } from 'react';

const getItem = <T>(key: string, initialValue: T) => {
  try {
    const current = localStorage.getItem(key);
    const parsedCurrent = JSON.parse(current || '');
    return parsedCurrent || initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [state, setState] = useState(() => getItem(key, initialValue || ''));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
