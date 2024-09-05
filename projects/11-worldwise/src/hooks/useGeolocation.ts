import { useReducer, type Reducer } from "react";

type ReducerValueType = {
  isLoading: boolean;
  error: Error | GeolocationPositionError | null;
  position: { lat: number; lng: number } | null;
};
type ReducerActionType =
  | { type: "geo/starting" }
  | { type: "geo/position"; payload: ReducerValueType["position"] }
  | { type: "geo/error"; payload: { error: ReducerValueType["error"] } };

const reducer: Reducer<ReducerValueType, ReducerActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case "geo/starting":
      return { isLoading: true, position: null, error: null };
    case "geo/position":
      return { isLoading: false, position: action.payload, error: null };
    case "geo/error":
      return { isLoading: false, position: null, error: action.payload.error };
    default:
      return state;
  }
};

const reducerInitialValue = {
  isLoading: false,
  error: null,
  position: null,
} satisfies ReducerValueType;

export function useGeolocation() {
  const [state, dispatch] = useReducer(reducer, reducerInitialValue);

  function getPosition() {
    const isSupport =
      typeof navigator !== "undefined" &&
      typeof navigator.geolocation !== "undefined";
    if (!isSupport) {
      const error = new Error("This browser does not support geolocation");
      return dispatch({ type: "geo/error", payload: { error } });
    }

    dispatch({ type: "geo/starting" });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch({
          type: "geo/position",
          payload: { lat: coords.latitude, lng: coords.longitude },
        });
      },
      (error) => {
        dispatch({ type: "geo/error", payload: { error } });
      }
    );
  }

  return { ...state, getPosition };
}
