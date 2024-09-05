import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { accountReducer } from "./reducers/account";
import { customerReducer } from "./reducers/customer";

const reducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(reducers, undefined, applyMiddleware(thunk));

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
