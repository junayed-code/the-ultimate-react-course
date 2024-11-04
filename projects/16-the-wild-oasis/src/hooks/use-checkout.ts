import { mutate } from 'swr';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { updateBooking } from '@services/api/bookings';
import { Tables } from '@services/supabase/database.types';

type Key = [string, string];
type SWRConfig = SWRMutationConfiguration<Tables<'bookings'>, Error, Key>;

const checkoutBooking = ([, id]: Key) => {
  return updateBooking(+id, { status: 'checked-out' });
};

const onSuccess = ({ id }: Tables<'bookings'>) =>
  toast.success(`Booking #${id} has been checked out successfully`);
const onError = () =>
  toast.error(`An error occurred while checking out the booking`);

export function useCheckout(id: string, config?: SWRConfig) {
  const [params] = useSearchParams();
  const {
    trigger: checkoutTrigger,
    isMutating: isCheckingOut,
    ...swr
  } = useSWRMutation(['booking', id], checkoutBooking, {
    revalidate: false,
    populateCache: true,
    onError,
    onSuccess,
    ...config,
  });

  function handleCheckout() {
    const toastId = toast.loading(`Checking out...`);
    checkoutTrigger(undefined, {
      onSuccess(data) {
        toast.dismiss(toastId);
        onSuccess(data);
        // Revalidate the bookings cache
        mutate(['bookings', params.toString()]);
      },
      onError() {
        toast.dismiss(toastId);
        onError();
      },
    });
  }

  return { handleCheckout, checkoutTrigger, isCheckingOut, ...swr };
}
