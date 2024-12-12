import React, { useEffect, useState } from 'react';

function isValidJSON(value: string) {
  try {
    return typeof JSON.parse(value) === 'object';
  } catch {
    return false;
  }
}

export function useLocalStorage<S>(
  initialState: S,
  key: string,
): [S, React.Dispatch<React.SetStateAction<S>>];
export function useLocalStorage<S>(
  initialState: () => S,
  key: string,
): [S, React.Dispatch<React.SetStateAction<S>>];
export function useLocalStorage<S>(initialState: unknown, key: string) {
  const [value, setValue] = useState<S>(function () {
    const storedValue = localStorage.getItem(key);
    // If initialState is a function, then call the function to get
    // the state value
    const stateValue =
      typeof initialState === 'function' ? initialState() : initialState;
    // If the stored value is found, then use it otherwise use the
    // initialState value. Convert the storedValue to an object if it's a
    // valid JSON otherwise, use it as it is.
    return !storedValue
      ? stateValue
      : isValidJSON(storedValue)
        ? JSON.parse(storedValue)
        : storedValue;
  });

  useEffect(() => {
    const _value =
      typeof value === 'object' ? JSON.stringify(value) : value + '';
    localStorage.setItem(key, _value);
  }, [value, key]);

  return [value, setValue];
}
