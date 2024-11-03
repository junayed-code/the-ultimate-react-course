import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { updateBooking } from '@services/api/bookings';
import { Tables } from '@services/supabase/database.types';

// Update the booking status to 'checked-in' and is_paid to true
const checkinBooking = ([, id]: [string, string]) =>
  updateBooking(Number(id), { status: 'checked-in', is_paid: true });

export const useCheckin = (
  id: string,
  config?: SWRMutationConfiguration<
    Tables<'bookings'>,
    Error,
    [string, string]
  >,
) => {
  const navigate = useNavigate();
  const { trigger, isMutating, ...swr } = useSWRMutation(
    ['booking', id],
    checkinBooking,
    {
      revalidate: false,
      populateCache: true,
      onSuccess() {
        toast.success(`Booking #${id} has been checked in successfully`);
        navigate('/bookings');
      },
      onError() {
        toast.error('There was an error while checked in the booking');
      },
      ...config,
    },
  );
  return { checkinTrigger: trigger, isChecking: isMutating, ...swr };
};
