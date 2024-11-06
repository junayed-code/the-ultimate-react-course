import { useEffect } from 'react';
import useSWR, { preload } from 'swr';
import { useSearchParams } from 'react-router-dom';

import Table from '@ui/table';
import Spinner from '@ui/spinner';
import Pagination from '@ui/pagination';
import BookingRow from '@features/bookings/row';

import { bookingsFetcher } from '@services/api/bookings';

const MAX_BOOKINGS_LIMIT = 10;

function BookingTable() {
  const [params] = useSearchParams();
  const { data, isLoading } = useSWR(
    ['bookings', params.toString()],
    bookingsFetcher,
    { revalidateOnFocus: false },
  );
  const { bookings, count, ...pagination } = data ?? {};

  // Preload bookings data effect
  useEffect(() => {
    if (!count) return;
    const searchParams = new URLSearchParams(params);
    const currPage = Number(searchParams.get('page') ?? 1);
    const pageCount = Math.ceil(count / MAX_BOOKINGS_LIMIT);

    // Preload for next page
    if (currPage < pageCount) {
      searchParams.set('page', currPage + 1 + '');
      preload(['bookings', searchParams.toString()], bookingsFetcher);
    }
    // Preload for previous page
    if (currPage > 1) {
      if (currPage === 2) searchParams.delete('page');
      else searchParams.set('page', currPage - 1 + '');
      preload(['bookings', searchParams.toString()], bookingsFetcher);
    }
  }, [params, count]);

  if (isLoading) return <Spinner $size="lg" $variant="primary" />;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Column as="th">Cabin</Table.Column>
          <Table.Column as="th">Guest</Table.Column>
          <Table.Column as="th">Dates</Table.Column>
          <Table.Column as="th">Status</Table.Column>
          <Table.Column as="th">Amount</Table.Column>
          <Table.Column as="th"></Table.Column>
        </Table.Row>
      </Table.Header>

      <Table.Body
        data={bookings!}
        render={booking => <BookingRow key={booking.id} booking={booking} />}
      />

      {/* Show bookings pagination if the bookings count is greater than maximum bookings limit */}
      {'limit' in pagination && count! > pagination.limit && (
        <Table.Footer>
          <Table.Row>
            <Table.Column colSpan={6} style={{ paddingBlock: '0.5rem' }}>
              <Pagination count={count!} {...pagination} />
            </Table.Column>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
}

export default BookingTable;
