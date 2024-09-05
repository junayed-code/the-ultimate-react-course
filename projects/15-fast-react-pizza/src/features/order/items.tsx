import OrderItem from '@features/order/item';
import { type CartItemT } from '@features/cart/cart-item';

function OrderItems({ cart }: { cart: CartItemT[] }) {
  return (
    <ul className="divide-y divide-stone-400 rounded-md bg-stone-200 px-6 py-4">
      {cart.map(item => (
        <OrderItem key={item.pizzaId} item={item} />
      ))}
    </ul>
  );
}

export default OrderItems;
