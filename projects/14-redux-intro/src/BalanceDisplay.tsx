import { useAppSelector } from "./store/hooks";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useAppSelector((state) => state.account);
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
