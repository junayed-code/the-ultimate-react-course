import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiEye,
  HiEllipsisVertical,
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
} from 'react-icons/hi2';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Menu from '@ui/menu';
import Table from '@ui/table';

import { useCheckout } from '@hooks/use-checkout';
import { bookingsFetcher } from '@services/api/bookings';
import { pickTagVariant } from '@utils/pick-tag-variant';
import { formatCurrency, formatDistanceFromNow } from '@utils/helpers';

const CabinNameColumn = styled(Table.Column)`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const AmountColumn = styled(Table.Column)`
  font-weight: 500;
`;

const Stacked = styled(Row).attrs({
  $gap: '0.125rem',
  $align: 'start',
  $direction: 'vertical',
})`
  & span:first-child {
    font-weight: 500;
  }
  & span:last-child {
    color: var(--color-grey-500);
    font-size: 0.75rem;
  }
`;

type BookingRowProps = {
  booking: Awaited<ReturnType<typeof bookingsFetcher>>['bookings'][number];
};

function BookingRow({ booking }: BookingRowProps) {
  const { handleCheckout, isCheckingOut } = useCheckout(booking.id + '');

  const { cabins, status, guests, nights, start_date, end_date, total_price } =
    booking;

  return (
    <Table.Row>
      <CabinNameColumn>{cabins?.name}</CabinNameColumn>

      <Table.Column>
        <Stacked>
          <span>{guests?.fullname}</span>
          <span>{guests?.email}</span>
        </Stacked>
      </Table.Column>

      <Table.Column>
        <Stacked>
          <span>
            {isToday(new Date(start_date))
              ? 'Today'
              : formatDistanceFromNow(start_date)}{' '}
            &rarr; {nights} night stay
          </span>
          <span>
            {format(new Date(start_date), 'MMM dd yyyy')} &mdash;{' '}
            {format(new Date(end_date), 'MMM dd yyyy')}
          </span>
        </Stacked>
      </Table.Column>

      <Table.Column>
        <Tag $variant={pickTagVariant(status)}>{status}</Tag>
      </Table.Column>

      <AmountColumn>{formatCurrency(total_price)}</AmountColumn>

      {/* Booking actions column */}
      <Table.Column>
        <Menu>
          <Menu.Toggle $size="icon">
            <HiEllipsisVertical />
          </Menu.Toggle>
          <Menu.List>
            <Menu.Item>
              <Menu.Link
                to={`/bookings/${booking.id}`}
                disabled={isCheckingOut}
              >
                <HiEye /> See detail
              </Menu.Link>
            </Menu.Item>

            {/* Only unconfirmed bookings are allowed for check-in */}
            {status === 'unconfirmed' && (
              <Menu.Item>
                <Menu.Link to={`/checkin/${booking.id}`}>
                  <HiArrowDownOnSquare /> Check in
                </Menu.Link>
              </Menu.Item>
            )}

            {/* Only checked-in bookings are allowed for check-out */}
            {status === 'checked-in' && (
              <Menu.Item>
                <Menu.Button onClick={handleCheckout} disabled={isCheckingOut}>
                  <HiArrowUpOnSquare /> Check out
                </Menu.Button>
              </Menu.Item>
            )}
          </Menu.List>
        </Menu>
      </Table.Column>
    </Table.Row>
  );
}

export default BookingRow;
