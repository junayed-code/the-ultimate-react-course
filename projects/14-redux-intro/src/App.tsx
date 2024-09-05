import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./AccountOperations";
import BalanceDisplay from "./BalanceDisplay";
import { useAppSelector } from "./store/hooks";

function App() {
  const customer = useAppSelector((store) => store.customer);
  const hasCustomer = !!customer.fullName;

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!hasCustomer && <CreateCustomer />}
      {hasCustomer && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
