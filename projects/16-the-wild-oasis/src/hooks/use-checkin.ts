import toast from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { updateBooking } from '@services/api/bookings';
import { Tables } from '@services/supabase/database.types';
import { useMoveBack } from '@hooks/use-move-back';

type Key = [string, string];
type Arg = {
  totalPrice?: number;
  hasBreakfast?: boolean;
  breakfastPrice?: number;
};

const checkinBooking = ([, id]: Key, { arg }: { arg: Arg }) => {
  let breakfast = {};
  const { hasBreakfast, totalPrice, breakfastPrice } = arg;

  // Add breakfast at booking check-in time if users want
  if (hasBreakfast && totalPrice && breakfastPrice) {
    breakfast = {
      has_breakfast: true,
      total_price: totalPrice,
      extra_price: breakfastPrice,
    };
  }
  // Update the booking status to 'checked-in', is_paid to true, and
  // add breakfast if needed
  return updateBooking(Number(id), {
    status: 'checked-in',
    is_paid: true,
    ...breakfast,
  });
};

export const useCheckin = (
  id: string,
  config?: SWRMutationConfiguration<Tables<'bookings'>, Error, Key>,
) => {
  const moveBack = useMoveBack();
  const { trigger, isMutating, ...swr } = useSWRMutation(
    ['booking', id],
    checkinBooking,
    {
      revalidate: false,
      populateCache: true,
      onSuccess() {
        toast.success(`Booking #${id} has been checked in successfully`);
        moveBack();
      },
      onError() {
        toast.error('There was an error while checked in the booking');
      },
      ...config,
    },
  );
  return { checkinTrigger: trigger, isChecking: isMutating, ...swr };
};
