import { useEffect, useState } from 'react';

const useDebounce = (query: string, delay: number) => {
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setSearchQuery(query);
    }, delay);
    return () => clearTimeout(unsubscribe);
  }, [query, delay]);

  return searchQuery;
};

export default useDebounce;
