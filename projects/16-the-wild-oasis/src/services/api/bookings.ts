import supabase from '@services/supabase';

const db = () => supabase.from('bookings');

export async function bookingsFetcher([, search]: [string, string]) {
  const params = new URLSearchParams(search);
  let query = db().select(
    'id, nights, status, start_date, end_date, total_price, cabins(name), guests(fullname, email)',
  );

  // Sort bookings by field in ascending or descending order
  const sort = params.get('sort') ?? '-start_date';
  const isAscending = !sort.startsWith('-');
  const field = sort.replace('-', '');
  query = query.order(field, { ascending: isAscending });
  params.delete('sort');

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

  const { data, error } = await query;

  if (error) throw new Error('Bookings could not be loaded');
  return data;
}
