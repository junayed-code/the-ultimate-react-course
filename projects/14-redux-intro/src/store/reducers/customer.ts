type CustomerAction =
  | {
      type: "customer/create";
      payload: { fullName: string; NID: string; createdAt: string };
    }
  | { type: "customer/update"; payload: { fullName: string } };

type CustomerState = {
  fullName: string | null;
  NID: string | null;
  createdAt: string | null;
};

const initialState: CustomerState = {
  fullName: null,
  NID: null,
  createdAt: null,
};

export function customerReducer(state = initialState, action: CustomerAction) {
  switch (action.type) {
    case "customer/create": {
      const { fullName, NID, createdAt } = action.payload;
      return { ...state, fullName, NID, createdAt };
    }
    case "customer/update": {
      const { fullName } = action.payload;
      return { ...state, fullName };
    }
    default:
      return state;
  }
}

export const create = (fullName: string, NID: string) =>
  ({
    type: "customer/create",
    payload: { fullName, NID, createdAt: new Date().toISOString() },
  } as const);

export const update = (fullName: string) =>
  ({
    type: "customer/update",
    payload: { fullName },
  } as const);
