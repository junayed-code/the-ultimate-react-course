import { useEffect, useState } from 'react';

function isValidJSON(value: string) {
  try {
    return typeof JSON.parse(value) === 'object';
  } catch {
    return false;
  }
}

export function useLocalStorage<S>(initialState: S, key: string) {
  const [value, setValue] = useState<S>(function () {
    const storedValue = localStorage.getItem(key);
    return !storedValue
      ? initialState
      : isValidJSON(storedValue)
        ? JSON.parse(storedValue)
        : storedValue;
  });

  useEffect(() => {
    const _value =
      typeof value === 'object' ? JSON.stringify(value) : value + '';
    localStorage.setItem(key, _value);
  }, [value, key]);

  return [value, setValue] as const;
}
