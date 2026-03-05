import { useCallback, useState } from 'react';

const useCounter = (value: number) => {
  const [count, setCount] = useState<number>(value);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => (prev > 1 ? prev - 1 : prev));
  }, []);

  return {
    count,
    increment,
    decrement,
  };
};

export default useCounter;
