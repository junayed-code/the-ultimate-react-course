// Test ID: IIDSAT, QELWT7, XEGSIA, 9VW3XR
import {
  useFetcher,
  useLoaderData,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from 'react-router-dom';

import Button from '@ui/button';
import OrderPrice from '@features/order/price';
import OrderItems from '@features/order/items';
import OrderStatus from '@features/order/status';
import OrderDeliveryTime from '@features/order/delivery-time';
import { type CartItemT } from '@features/cart/cart-item';
import { getOrder, updateOrder } from '@services/api/restaurant';

export type OrderT = {
  id: string;
  phone: string;
  customer: string;
  cart: CartItemT[];
  address: string;
  priority: boolean;
  status: string;
  estimatedDelivery: string;
  position: string;
  orderPrice: number;
  priorityPrice: number;
};

function Order() {
  const order = useLoaderData() as OrderT;
  const fetcher = useFetcher();
  const { cart } = order;
  const isLoading = fetcher.state === 'loading';
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <OrderStatus order={order} />

      <OrderDeliveryTime order={order} />

      {/* Render ordered items */}
      <OrderItems cart={cart} />

      <OrderPrice order={order} />

      {!order.priority && (
        <fetcher.Form method="PATCH" className="text-right">
          <Button disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? 'Loading...' : 'Make Priority'}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
}

Order.loader = async function loader({ params }: LoaderFunctionArgs) {
  const order = await getOrder((params as { orderId: string }).orderId);
  return order;
};

Order.action = async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true };
  await updateOrder(params.orderId as string, data);
  return null;
};

export default Order;
