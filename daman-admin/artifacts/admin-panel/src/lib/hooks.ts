import { useState, useEffect } from "react";
import { apiCall } from "./api";

interface UseQueryOptions {
  enabled?: boolean;
  retry?: boolean;
  staleTime?: number;
  headerType?: 'bearer' | 'admin-token';
}

interface UseMutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  headerType?: 'bearer' | 'admin-token';
}

export function useQuery<T>(
  endpoint: string,
  options: UseQueryOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(options.enabled !== false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const result = await apiCall<T>(endpoint, {}, options.headerType || 'bearer');
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsError(true);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, options.enabled, options.headerType]);

  const refetch = async () => {
    let isMounted = true;
    try {
      setIsLoading(true);
      setIsError(false);
      const result = await apiCall<T>(endpoint, {}, options.headerType || 'bearer');
      if (isMounted) {
        setData(result);
        setIsLoading(false);
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsError(true);
        setIsLoading(false);
      }
    }
  };
  return { data, isLoading, isError, error, refetch };
}

export function useMutation<TData, TPayload>(
  method: "post" | "put" | "patch" | "delete",
  baseEndpoint: string,
  options: UseMutationOptions = {}
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    payload?: TPayload | { data: TPayload },
    callbacks?: UseMutationOptions
  ) => {
    try {
      setIsPending(true);
      setError(null);

  let endpoint = baseEndpoint;
  let dataToSend = null;
  
  console.log('🔧 BEFORE REPLACEMENT - baseEndpoint:', baseEndpoint, 'payload:', payload);
  
  if (payload && typeof payload === 'object') {
    // Handle {id: '...'} format for :id replacement
    if ('id' in (payload as any) && (payload as any).id && baseEndpoint.includes(':id')) {
      const idValue = String((payload as any).id);
      console.log('🔧 FOUND ID, REPLACING :id -> "' + idValue + '"');
      endpoint = baseEndpoint.replace(':id', idValue);
      delete (payload as any).id;
    }
    
    // FIXED: Preserve payload as dataToSend for login POST
    if ('data' in (payload as any)) {
      dataToSend = (payload as any).data;
    } else {
      dataToSend = payload; // DIRECT PAYLOAD for login/signup etc
    }
  }
  
  console.log('🔧 AFTER REPLACEMENT - FINAL endpoint:', endpoint, 'dataToSend:', dataToSend);
      let result: TData;
      const headerType = callbacks?.headerType || options.headerType || 'bearer';

      if (method === "post") {
        result = await apiCall<TData>(endpoint, {
          method: "POST",
          body: JSON.stringify(dataToSend),
        }, headerType);
      } else if (method === "put") {
        result = await apiCall<TData>(endpoint, {
          method: "PUT",
          body: JSON.stringify(dataToSend),
        }, headerType);
      } else if (method === "patch") {
        result = await apiCall<TData>(endpoint, {
          method: "PATCH",
          body: JSON.stringify(dataToSend),
        }, headerType);
      } else {
        const deleteOptions: RequestInit = { method: "DELETE" };
        if (dataToSend) {
          deleteOptions.body = JSON.stringify(dataToSend);
        }
        result = await apiCall<TData>(endpoint, deleteOptions, headerType);
      }

      setIsPending(false);
      (callbacks?.onSuccess || options.onSuccess)?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      (callbacks?.onError || options.onError)?.(error);
      throw error;
    }
  };

  return { mutate, isPending, error };
}
