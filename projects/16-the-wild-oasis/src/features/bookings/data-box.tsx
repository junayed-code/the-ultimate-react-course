import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiOutlineChatBubbleBottomCenterText,
} from 'react-icons/hi2';

import Row from '@ui/row';
import Flag from '@ui/flag';

import { getBooking } from '@services/api/bookings';
import { formatDistanceFromNow, formatCurrency } from '@utils/helpers';

const StyledBookingDataBox = styled.section`
  --space-x: 2rem;
  --space-y: 1.5rem;
  --padding-box: calc(var(--space-y) * 0.84) var(--space-x);
  --padding-space: var(--space-y) var(--space-x);

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled(Row).attrs({ $justify: 'between', as: 'header' })`
  font-weight: 500;
  color: var(--color-brand-100);
  background-color: var(--color-brand-500);
  padding: var(--padding-box);

  div:first-child {
    font-weight: 600;
    font-size: 1.125rem;
    span {
      margin-left: 4px;
      color: var(--color-brand-50);
    }
  }
`;

const Body = styled.section`
  padding: var(--padding-space);
`;

const Footer = styled.footer`
  font-size: 0.75rem;
  text-align: right;
  padding: var(--padding-space);
  color: var(--color-grey-500);
`;

const Data = styled(Row).attrs({ $gap: '1rem' })`
  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
  label {
    font-weight: 500;
    svg {
      font-size: 1.5rem;
    }
  }
`;

const Guest = styled(Row).attrs({ $gap: '0.75rem' })`
  margin-bottom: var(--space-y);
  color: var(--color-grey-500);
  p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

type PriceProps = { $isPaid?: boolean };

const Price = styled(Row).attrs<PriceProps>({ $justify: 'between' })`
  --color: ${({ $isPaid }) =>
    $isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};
  --background: ${({ $isPaid }) =>
    $isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};

  color: var(--color);
  margin-top: var(--space-y);
  border-radius: var(--border-radius-sm);
  padding: var(--padding-box);
  background-color: var(--background);

  p:last-child {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

type BookingDataBoxProps = {
  booking: Extract<
    Awaited<ReturnType<typeof getBooking>>,
    { created_at: string }
  >;
};

// A purely presentational component
function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    created_at,
    start_date,
    end_date,
    nights,
    guests_count,
    cabin_price,
    extra_price,
    total_price,
    has_breakfast,
    observations,
    is_paid,
    guests,
    cabins,
  } = booking;

  const { name: cabinName } = cabins ?? {};
  const { nationality, country_flag, national_id } = guests ?? {};

  return (
    <StyledBookingDataBox>
      <Header>
        <Row $gap="1rem">
          <HiOutlineHomeModern size="28" />
          <p>
            {nights} nights in Cabin <span>{cabinName}</span>
          </p>
        </Row>
        <p>
          {format(new Date(start_date), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(start_date))
            ? 'Today'
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), 'EEE, MMM dd yyyy')}
        </p>
      </Header>

      <Body>
        <Guest>
          <Flag src={country_flag} alt={`Flag of ${nationality}`} />
          <p>
            {guests?.fullname}{' '}
            {guests_count > 1 ? `+ ${guests_count - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{guests?.email}</p>
          <span>&bull;</span>
          <p>National ID {national_id}</p>
        </Guest>

        {observations && (
          <Data>
            <Row as="label">
              <HiOutlineChatBubbleBottomCenterText color="var(--color-brand-600)" />
              <span>Observations</span>
            </Row>
            <span>{observations}</span>
          </Data>
        )}

        <Data>
          <Row as="label">
            <HiOutlineCheckCircle color="var(--color-brand-600)" />
            <span>Breakfast included?</span>
          </Row>
          <span>{has_breakfast ? 'Yes' : 'No'}</span>
        </Data>

        <Price $isPaid={is_paid}>
          <Data>
            <Row as="label">
              <HiOutlineCurrencyDollar />
              <span>Total price</span>
            </Row>
            <span>
              {formatCurrency(total_price)}
              {has_breakfast &&
                ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                  extra_price ?? 0,
                )} breakfast)`}
            </span>
          </Data>
          <p>{is_paid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Body>

      <Footer>
        <p>Booked at {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
