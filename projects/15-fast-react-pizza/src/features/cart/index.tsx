import { Link as ReactRouterLink } from 'react-router-dom';

import Link from '@ui/link';
import Button from '@ui/button';
import CartItem from '@features/cart/cart-item';
import EmptyCart from '@features/cart/empty-cart';
import { getUsername } from '@features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearCart, getCartItems } from '@features/cart/cart-slice';

function Cart() {
  const dispatch = useAppDispatch();
  const username = useAppSelector(getUsername);
  const cart = useAppSelector(getCartItems);

  const handleClearCart = () => dispatch(clearCart());

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/menu">&larr; Back to menu</Link>
      <h3 className="mt-10">Your cart, {username}</h3>
      <ul className="mt-4 divide-y border-b">
        {cart.map(item => (
          <CartItem key={item.name} item={item} />
        ))}
      </ul>
      <div className="mt-8 space-x-4">
        <Button asChild>
          <ReactRouterLink to="/order/new">Order pizzas</ReactRouterLink>
        </Button>
        <Button onClick={handleClearCart} variant="outline">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
