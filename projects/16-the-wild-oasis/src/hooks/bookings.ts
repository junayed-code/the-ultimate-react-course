import useSWR, { SWRConfiguration } from 'swr';

import { getBooking } from '@services/api/bookings';

export const useBooking = (id: string, config?: SWRConfiguration) => {
  const { data, mutate, ...swr } = useSWR(['booking', id], getBooking, {
    revalidateOnFocus: false,
    ...config,
  });
  return { booking: data, mutateBooking: mutate, ...swr };
};
