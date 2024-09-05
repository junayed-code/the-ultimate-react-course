import Button from '@ui/button';
import cn from '@utils/cn';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { formatCurrency } from '@utils/helpers';
import { addItem, getCartItemById } from '@features/cart/cart-slice';
import { CartItemT as CartItem } from '@features/cart/cart-item';
import { Link } from 'react-router-dom';

export type Pizza = {
  id: number;
  name: string;
  imageUrl: string;
  soldOut: boolean;
  unitPrice: number;
  ingredients: string[];
};

function MenuItem({ pizza }: { pizza: Pizza }) {
  const dispatch = useAppDispatch();
  const item = useAppSelector(getCartItemById(pizza.id));
  const isItemInCart = !!item;
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const handleAddToCart = () => {
    const item: CartItem = {
      name,
      pizzaId: id,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(item));
  };

  return (
    <li className={cn('flex gap-5', soldOut && 'opacity-80')}>
      <img
        src={imageUrl}
        alt={name}
        className={cn(
          'aspect-square w-full max-w-28',
          soldOut && 'opacity-75 grayscale',
        )}
      />
      <div className="flex flex-grow flex-col">
        <h4>{name}</h4>
        <p className="capitalize italic text-stone-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between font-medium uppercase">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-stone-500">Sold out</p>
          )}
          {isItemInCart ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/cart">Go to cart</Link>
            </Button>
          ) : (
            <Button disabled={soldOut} size="sm" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
