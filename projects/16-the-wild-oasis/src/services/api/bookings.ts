import supabase from '@services/supabase';

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
