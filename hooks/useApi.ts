import { useState, useCallback } from 'react';

export function useApi<T, Args extends any[]>(apiFn: (...args: Args) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(
    async (...args: Args): Promise<T> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFn]
  );

  return { data, isLoading, error, trigger };
}
