import { formatCurrency } from '@utils/helpers';
import { type OrderT } from '.';

function OrderPrice({ order }: { order: OrderT }) {
  const { priority, priorityPrice, orderPrice } = order;

  return (
    <div className="space-y-1.5 rounded-md bg-stone-200 px-6 py-4">
      {priority && (
        <p className="flex items-center justify-between gap-4 font-medium text-stone-600">
          <span>Price priority:</span>
          <span>{formatCurrency(priorityPrice)}</span>
        </p>
      )}
      <p className="flex items-center justify-between gap-4 font-medium text-stone-600">
        <span>Price pizza:</span>
        <span>{formatCurrency(orderPrice)}</span>
      </p>
      <p className="flex items-center justify-between gap-4 font-bold">
        <span>To pay on delivery:</span>
        <span>{formatCurrency(orderPrice + priorityPrice)}</span>
      </p>
    </div>
  );
}

export default OrderPrice;
