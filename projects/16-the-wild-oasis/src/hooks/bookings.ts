import toast from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';
import { useLocation, useSearchParams } from 'react-router-dom';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import {
  getBooking,
  deleteBooking,
  getBookingStatistics,
} from '@services/api/bookings';

type SWRKey = [string, string];
type SWRMutationConfig = SWRMutationConfiguration<null, Error, SWRKey>;

export const useBooking = (id: string, config?: SWRConfiguration) => {
  const { data, mutate, ...swr } = useSWR(['booking', id], getBooking, {
    revalidateOnFocus: false,
    ...config,
  });
  return { booking: data, mutateBooking: mutate, ...swr };
};

export const useDeleteBooking = (id: number, config?: SWRMutationConfig) => {
  const [params] = useSearchParams();
  const { state } = useLocation();

  // Get the searchParams from the previous bookings page
  // if current page isn't the bookings page
  const search =
    state?.pathname === '/bookings'
      ? state.search.replace('?', '')
      : params.toString();

  const {
    isMutating: isBookingDeleting,
    trigger: bookingDeleteTrigger,
    ...swr
  } = useSWRMutation(['bookings', search], () => deleteBooking(id), {
    onSuccess() {
      toast.success(`The booking#${id} is successfully deleted`);
    },
    onError() {
      toast.error(`An error occurred while deleting the booking`);
    },
    ...config,
  });

  return { bookingDeleteTrigger, isBookingDeleting, ...swr };
};

export function useBookingStatistics() {
  const [params] = useSearchParams();
  const { data: statistics, ...swr } = useSWR(
    ['booking-statistics', params.toString()],
    getBookingStatistics,
    { revalidateOnFocus: false },
  );
  return { statistics, ...swr };
}
