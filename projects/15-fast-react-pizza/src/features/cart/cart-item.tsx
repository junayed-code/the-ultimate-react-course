import Button from '@/ui/button';
import {
  deleteItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from '@features/cart/cart-slice';
import { useAppDispatch } from '@/store/hooks';
import { formatCurrency } from '@utils/helpers';

export type CartItemT = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

function CartItem({ item }: { item: CartItemT }) {
  const dispatch = useAppDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;

  const handleDeleteItem = () => dispatch(deleteItem(pizzaId));
  const handleIncreaseQuantity = () => dispatch(increaseItemQuantity(pizzaId));
  const handleDecreaseQuantity = () => dispatch(decreaseItemQuantity(pizzaId));

  return (
    <li className="py-2.5 first:pt-0">
      <h5 className="mb-0.5 font-bold">
        {quantity}&times; {name}
      </h5>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-5">
          {/* Quantity increase and decrease buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              className="rounded-full pb-0.5 text-base"
              disabled={quantity === 1}
              onClick={handleDecreaseQuantity}
            >
              -
            </Button>
            <span className="min-w-6 text-center font-semibold">
              {(quantity + '').padStart(2, '0')}
            </span>
            <Button
              size="icon"
              className="rounded-full pb-0.5 text-base"
              onClick={handleIncreaseQuantity}
            >
              +
            </Button>
          </div>
          {/* Delete cart item button */}
          <Button onClick={handleDeleteItem} variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
