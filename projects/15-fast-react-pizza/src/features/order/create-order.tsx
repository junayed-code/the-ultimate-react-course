import { redirect, useActionData, ActionFunctionArgs } from 'react-router-dom';

import EmptyCart from '@features/cart/empty-cart';
import OrderForm from '@features/order/form';
import { clearCart, getCartItems } from '@features/cart/cart-slice';
import { isValidPhone } from '@utils/isValidPhone';
import { createOrder } from '@services/api/restaurant';
import { store } from '@/store';
import { useAppSelector } from '@store/hooks';

function CreateOrder() {
  const cart = useAppSelector(getCartItems);
  const { errors } = (useActionData() || {}) as {
    errors?: Record<string, string>;
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-8">Ready to order? Let&apos;s go!</h2>
      <OrderForm cart={cart} errors={errors} />
    </div>
  );
}

CreateOrder.action = async function action({ request }: ActionFunctionArgs) {
  const errors: Record<string, string> = {};
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === 'on',
  };

  // Validate the user phone number
  if (!isValidPhone(data.phone as string)) {
    errors.phone = "It's an incorrect phone number";
  }

  // If errors found then return errors otherwise create an order and
  // redirect to the order page
  if (Object.keys(errors).length) return { errors };
  const order = await createOrder(newOrder);
  // Use store.dispatch function this way only for extreme use cases.
  // Do not overuse!
  store.dispatch(clearCart());
  return redirect(`/order/${order.id}`);
};

export default CreateOrder;
