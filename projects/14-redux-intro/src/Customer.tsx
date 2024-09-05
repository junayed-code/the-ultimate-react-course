import { useAppSelector } from "./store/hooks";

function Customer() {
  const customer = useAppSelector((state) => state.customer);

  return <h2>👋 Welcome, {customer.fullName}</h2>;
}

export default Customer;
