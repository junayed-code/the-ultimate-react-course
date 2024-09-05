import { formatCurrency } from '@utils/helpers';
import { type CartItemT } from '@features/cart/cart-item';

type OrderItemProps = {
  item: CartItemT;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-5">
        <h5 className="font-semibold">
          <span>{quantity}&times;</span> {name}
        </h5>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
