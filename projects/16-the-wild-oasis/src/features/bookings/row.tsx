import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiEye,
  HiEllipsisVertical,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Menu from '@ui/menu';
import Table from '@ui/table';

import { bookingsFetcher } from '@services/api/bookings';
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

const tagVariantOnStatus = {
  unconfirmed: 'default',
  'checked-in': 'primary',
  'checked-out': 'secondary',
} as const;

type BookingRowProps = {
  booking: Awaited<ReturnType<typeof bookingsFetcher>>['bookings'][number];
};

function BookingRow({ booking }: BookingRowProps) {
  const { cabins, status, guests, nights, start_date, end_date, total_price } =
    booking;
  const variant = tagVariantOnStatus[status as keyof typeof tagVariantOnStatus];

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
        <Tag $variant={variant}>{status}</Tag>
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
              <Menu.Link to={`/bookings/${booking.id}`}>
                <HiEye /> See detail
              </Menu.Link>
            </Menu.Item>
            {status === 'unconfirmed' && (
              <Menu.Item>
                <Menu.Link to={`/checkin/${booking.id}`}>
                  <HiArrowDownOnSquare /> Check in
                </Menu.Link>
              </Menu.Item>
            )}
          </Menu.List>
        </Menu>
      </Table.Column>
    </Table.Row>
  );
}

export default BookingRow;
