import { preload } from 'swr';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

import Table from '@ui/table';
import Spinner from '@ui/spinner';
import Pagination from '@ui/pagination';
import BookingRow from '@features/bookings/row';

import { bookingsFetcher } from '@services/api/bookings';

const MAX_BOOKINGS_LIMIT = 10;

function BookingTable() {
  const [params] = useSearchParams();
  const { data, isLoading } = useSWRImmutable(
    ['bookings', params.toString()],
    bookingsFetcher,
  );
  const { bookings, count, ...rest } = data! || {};

  // Preload bookings data effect
  useEffect(() => {
    if (!count) return;
    const currPage = Number(params.get('page') ?? 1);
    const pageCount = Math.ceil(count / MAX_BOOKINGS_LIMIT);

    // Preload for next page
    if (currPage < pageCount) {
      params.set('page', currPage + 1 + '');
      preload(['bookings', params.toString()], bookingsFetcher);
    }
    // Preload for previous page
    if (currPage > 1) {
      if (currPage === 2) params.delete('page');
      else params.set('page', currPage - 1 + '');
      preload(['bookings', params.toString()], bookingsFetcher);
    }
  }, [params, count]);

  if (isLoading) return <Spinner />;

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
      {data && count! > data.limit && (
        <Table.Footer>
          <Table.Row>
            <Table.Column colSpan={6} style={{ paddingBlock: '0.5rem' }}>
              <Pagination count={count!} {...rest} />
            </Table.Column>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
}

export default BookingTable;
