import type { AppDispatch } from "..";

type AccountAction =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/request-loan";
      payload: { amount: number; purpose: string };
    }
  | { type: "account/pay-loan" }
  | { type: "account/converting-currency" };

type AccountState = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};

const initialState: AccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export function accountReducer(
  state = initialState,
  action: AccountAction
): AccountState {
  switch (action.type) {
    case "account/deposit": {
      const balance = state.balance + action.payload;
      return { ...state, balance, isLoading: false };
    }

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/request-loan": {
      if (state.loan !== 0) return state;
      const { amount, purpose } = action.payload;
      const balance = state.balance + amount;
      return { ...state, balance, loan: amount, loanPurpose: purpose };
    }

    case "account/pay-loan": {
      if (state.loan === 0) return state;
      const balance = state.balance - state.loan;
      return { ...state, balance, loan: 0, loanPurpose: "" };
    }

    case "account/converting-currency":
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export const deposit = (amount: number, currency: string) => {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount } as AccountAction;
  }
  // Redux thunk middleware function, used for currency conversion
  return async function (dispatch: AppDispatch) {
    dispatch({ type: "account/converting-currency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
};

export const withdraw = (amount: number) =>
  ({
    type: "account/withdraw",
    payload: amount,
  } as const);

export const requestLoan = (amount: number, purpose: string) =>
  ({
    type: "account/request-loan",
    payload: { amount, purpose },
  } as const);

export const payLoan = () => ({ type: "account/pay-loan" });
