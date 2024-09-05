import { calcMinutesLeft, formatDate } from '@utils/helpers';
import { type OrderT } from '.';

function OrderDeliveryTime({ order }: { order: OrderT }) {
  const { estimatedDelivery } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 rounded-md bg-stone-200 px-6 py-4">
      <p className="font-medium">
        {deliveryIn >= 0
          ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
          : 'Order should have arrived'}
      </p>
      <p className="text-sm text-stone-600">
        (Estimated delivery: {formatDate(estimatedDelivery)})
      </p>
    </div>
  );
}

export default OrderDeliveryTime;
