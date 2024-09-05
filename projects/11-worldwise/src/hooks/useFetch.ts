/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer, type Reducer } from "react";

const fetchCache = new Map<
  string,
  { promise: Promise<any>; pending: boolean }
>();

type UseFetchState<T = any> = {
  data: T;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  refetch(): Promise<void>;
};

type UseFetchActionType =
  | { type: "fetching"; payload: { key: string } }
  | { type: "fetched"; payload: { data: any } }
  | { type: "error"; payload: { error: Error } };

const initialState = {
  data: null,
  error: null,
  isError: false,
  isLoading: false,
} satisfies Omit<UseFetchState, "refetch">;

const reducer: Reducer<Omit<UseFetchState, "refetch">, UseFetchActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case "fetching": {
      const { key } = action.payload;
      const isLoading = !!fetchCache.get(key)?.pending;
      return { ...initialState, isLoading };
    }
    case "fetched": {
      const { data } = action.payload;
      return { ...initialState, data };
    }
    case "error": {
      const { error } = action.payload;
      return { ...initialState, isError: true, error };
    }
    default:
      return state;
  }
};

export function useFetch<T>(
  key: string,
  fetchFn: (...args: any[]) => Promise<T>
): UseFetchState<T> {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refetch = async () => {
    const args = key.split("/").slice(1);
    const promise = fetchFn(...args)
      .then((data) => {
        fetchCache.set(key, { promise, pending: false });
        dispatch({ type: "fetched", payload: { data } });
        return data;
      })
      .catch((error) => {
        dispatch({ type: "error", payload: { error } });
        return error;
      });
    fetchCache.set(key, { promise, pending: true });
    await promise;
  };

  useEffect(() => {
    const isCached = fetchCache.has(key);
    dispatch({ type: "fetching", payload: { key } });

    if (isCached) {
      const { promise } = fetchCache.get(key)!;
      promise
        .then((data) => dispatch({ type: "fetched", payload: { data } }))
        .catch((error) => dispatch({ type: "error", payload: { error } }));
    } else {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { ...state, refetch };
}
