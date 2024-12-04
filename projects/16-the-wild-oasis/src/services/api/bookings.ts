import { subDays } from 'date-fns';
import supabase from '@services/supabase';
import { getToday } from '@utils/helpers';
import { TablesUpdate } from '@services/supabase/database.types';

const MAX_BOOKINGS_LIMIT = 10;

const db = () => supabase.from('bookings');

export async function bookingsFetcher([, search]: [string, string]) {
  const params = new URLSearchParams(search);
  const sort = params.get('sort') ?? '-start_date';
  const page = Number(params.get('page') ?? 1) - 1;
  // Delete sort and page params to prevent unexpected behavior when
  // the filter action happens.
  params.delete('sort');
  params.delete('page');

  // Make the base query
  let query = db().select(
    'id, nights, status, start_date, end_date, total_price, cabins(name), guests(fullname, email)',
    { count: 'exact' },
  );

  // Filter bookings according to params and condition
  params.forEach((value, key) => {
    const regex = /(\w+)(\[(e|ne|gt|lt|gte|lte)\])?/;
    const [, field, , con = ''] = regex.exec(key) ?? [];

    switch (con) {
      case '':
      case 'e':
        query = query.eq(field, value);
        break;
      case 'ne':
        query = query.neq(field, value);
        break;
      case 'gt':
        query = query.gt(field, value);
        break;
      case 'lt':
        query = query.lt(field, value);
        break;
      case 'gte':
        query = query.gte(field, value);
        break;
      case 'lte':
        query = query.lte(field, value);
    }
  });

  // Sort bookings by field in ascending or descending order
  const isAscending = !sort.startsWith('-');
  const field = sort.replace('-', '');
  query = query.order(field, { ascending: isAscending });

  // Make pagination for the bookings
  const limit = MAX_BOOKINGS_LIMIT,
    from = page * limit,
    to = from + limit;
  query = query.range(from, to).limit(limit);

  const { data: bookings, error, count } = await query;
  if (error) throw new Error('Bookings could not be loaded');

  const pageCount = Math.ceil(count! / limit);
  return {
    count,
    limit,
    bookings,
    pageCount,
    page: page + 1,
    from: from + 1,
    to: page === pageCount - 1 ? count! : to,
  };
}

export async function getBooking([, id]: [string, string]) {
  if (!id) return;
  const { data, error } = await db()
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

export async function updateBooking(
  id: number,
  values: TablesUpdate<'bookings'>,
) {
  const { data, error } = await db()
    .update(values)
    .eq('id', id)
    .select('*, cabins(*), guests(*)')
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    throw new Error('Booking could not be deleted');
  }
  return data;
}

/**
 * It's a fetcher function of SWR hook. It computes booking statistics
 * from the given date to present day and returns them. It is useful to
 * obtain booking statistics from the last few days. For example, it can
 * give booking statistics for the last 30 days.
 * @param {Date} date
 */
export async function getBookingStatistics([, search]: [string, string]) {
  // Get the last date from the search params that users set
  const last = Number(new URLSearchParams(search).get('last')) || 7;
  const lastDate = subDays(Date.now(), last).toISOString();
  const today = getToday({ end: true });

  // Make the all server request promises to get data from the server
  const createdBookingsPromise = db()
    .select('created_at, total_price, extra_price', { count: 'exact' })
    .gte('created_at', lastDate)
    .lte('created_at', today);

  const confirmedBookingsPromise = db()
    .select('total_price, nights, status', { count: 'exact' })
    .neq('status', 'unconfirmed')
    .gte('start_date', lastDate)
    .lte('start_date', today);

  const todayActivitiesPromise = db()
    .select('id, status, nights, guests(fullname, nationality, country_flag)')
    .or(
      `and(status.eq.unconfirmed, start_date.eq.${getToday()}), and(status.eq.checked-in, end_date.eq.${getToday()})`,
    )
    .order('created_at');

  const cabinsCountPromise = supabase
    .from('cabins')
    .select('*', { count: 'exact', head: true });

  // Resolve all promises together
  const [
    createdBookingsResponse,
    confirmedBookingsResponse,
    cabinsCountResponse,
    todayActivitiesResponse,
  ] = await Promise.all([
    createdBookingsPromise,
    confirmedBookingsPromise,
    cabinsCountPromise,
    todayActivitiesPromise,
  ]);

  // Destructuring all promises responses
  const {
    error: error1,
    count: bookingsCount,
    data: createdBookings,
  } = createdBookingsResponse;
  const {
    error: error2,
    count: confirmBookingsCount,
    data: confirmedBookings,
  } = confirmedBookingsResponse;
  const { error: error3, count: cabinsCount } = cabinsCountResponse;
  const { error: error4, data: todayActivities } = todayActivitiesResponse;

  // Handing errors
  if (error1 || error2 || error3 || error4) {
    throw new Error('An error occurred while obtaining booking statistics');
  }

  // Compute the total sales amount
  const salesAmount = createdBookings.reduce(
    (accumulator, booking) => accumulator + booking.total_price,
    0,
  );
  // Count the checked-in bookings
  const checkInBookingsCount = confirmedBookings.reduce(
    (accumulator, booking) =>
      accumulator + Number(booking.status === 'checked-in'),
    0,
  );
  // Count the total nights of confirmed bookings
  const totalNights = confirmedBookings.reduce(
    (accumulator, booking) => accumulator + booking.nights,
    0,
  );
  // Compute the occupancy rate
  const occupancyRate = Math.round((totalNights / (last * cabinsCount!)) * 100);

  // Statistics interval
  const interval = { start: subDays(Date.now(), last - 1), end: new Date() };

  return {
    interval,
    salesAmount,
    bookingsCount,
    occupancyRate,
    todayActivities,
    createdBookings,
    confirmedBookings,
    confirmBookingsCount,
    checkInBookingsCount,
  };
}
