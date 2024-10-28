import useSWRImmutable from 'swr/immutable';
import { useSearchParams } from 'react-router-dom';

import Table from '@ui/table';
import Spinner from '@ui/spinner';
import BookingRow from '@features/bookings/row';

import { bookingsFetcher } from '@services/api/bookings';

function BookingTable() {
  const [params] = useSearchParams();
  const { data: bookings, isLoading } = useSWRImmutable(
    ['bookings', params.toString()],
    bookingsFetcher,
  );

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
    </Table>
  );
}

export default BookingTable;
