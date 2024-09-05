import { useState } from 'react';
import { Form, useNavigation } from 'react-router-dom';

import Input from '@ui/input';
import Button from '@ui/button';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchAddress } from '@features/user/user-slice';
import { getTotalPriceAndPizza } from '@features/cart/cart-slice';
import { CartItemT as CartItem } from '@features/cart/cart-item';

type OrderFormProps = { cart: CartItem[]; errors?: Record<string, string> };

function OrderForm({ errors, cart }: OrderFormProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const { totalPrice } = useAppSelector(getTotalPriceAndPizza);
  const { username, address, status } = useAppSelector(store => store.user);

  const isLoading = status === 'loading';
  const isSubmitting = navigation.state === 'submitting';
  const priorityPrice = (totalPrice * 0.2).toFixed(2);

  const handleGetAddress = () => dispatch(fetchAddress());

  return (
    <Form method="POST" className="flex flex-col gap-5">
      <div className="space-y-1">
        <label htmlFor="customer">First Name</label>
        <Input
          id="customer"
          type="text"
          name="customer"
          defaultValue={username}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone">Phone number</label>
        <Input id="phone" type="tel" name="phone" required />
        {errors?.phone && (
          <p className="pl-0.5 pt-0.5 text-sm text-rose-500">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="address">Address</label>
        <div className="flex gap-2">
          <Input
            id="address"
            type="text"
            name="address"
            defaultValue={address}
            required
          />
          <Button
            size="sm"
            type="button"
            variant="outline"
            disabled={isLoading || !!address}
            onClick={handleGetAddress}
          >
            {isLoading ? 'Loading...' : 'Get Address'}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <input
          id="priority"
          type="checkbox"
          name="priority"
          checked={withPriority}
          onChange={e => setWithPriority(e.target.checked)}
          className="inline-block h-4 w-4 accent-yellow-400"
        />
        <label htmlFor="priority">
          Want to give your order priority for an additional ${priorityPrice}?
        </label>
      </div>

      <div className="mt-4">
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <Button type="submit" disabled={isSubmitting || isLoading} size="lg">
          {isSubmitting ? 'Placing order...' : 'Order now'}
        </Button>
      </div>
    </Form>
  );
}

export default OrderForm;
