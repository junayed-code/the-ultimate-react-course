import { useMemo } from 'react';
import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import { useBookingStatistics } from '@hooks/bookings';

export function useSalesChartData() {
  const { statistics } = useBookingStatistics();
  const { interval, createdBookings } = statistics ?? {};

  const salesData = useMemo(() => {
    if (!interval || !createdBookings) return;
    // Prepare sales data at the statistics interval
    return eachDayOfInterval(interval).map(date => {
      // Format the date to use as a label
      const label = format(date, 'MMM dd');
      // Compute the totalSales and total extraSales
      const { totalSales, extraSales } = createdBookings
        .filter(booking => isSameDay(date, booking.created_at))
        .reduce(
          function (accumulator, { total_price, extra_price }) {
            accumulator.totalSales += total_price;
            accumulator.extraSales += extra_price || 0;
            return { ...accumulator };
          },
          { totalSales: 0, extraSales: 0 },
        );
      return { label, totalSales, extraSales };
    });
  }, [interval, createdBookings]);

  return { salesData, interval };
}
