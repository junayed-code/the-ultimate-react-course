/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer, useReducer } from "react";

type UseStatesState<T, K extends keyof T> = { [R in K]: T[R] };

type UseStatesPayload<T, K extends keyof T> = Partial<UseStatesState<T, K>>;

const reducer = (state: any, payload: UseStatesPayload<any, any>) => {
  return { ...state, ...payload };
};

export function useStates<T extends object, K extends keyof T>(
  initialStates: T
) {
  return useReducer<Reducer<UseStatesState<T, K>, UseStatesPayload<T, K>>>(
    reducer,
    initialStates
  );
}
