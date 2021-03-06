import { useState, useEffect } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result: Record<string, any> = { ...object };
  console.log(result);
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!value) {
      if (isFalsy(value)) {
        delete result[key];
      }
    }
  });
  return result;
};

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...initialArray, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...initialArray];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
