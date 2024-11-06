import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

import Row from '@ui/row';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import Checkbox from '@ui/checkbox';
import BookingDataBox from '@features/bookings/data-box';

import { useBooking } from '@hooks/bookings';
import { useCheckin } from '@hooks/use-checkin';
import { useMoveBack } from '@hooks/use-move-back';
import { formatCurrency } from '@/utils/helpers';
import { settingsFetcher } from '@services/api/settings';

const Box = styled(Row).attrs({ $gap: '1rem' })`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.25rem 2rem;
  margin-top: -1rem;
  label {
    font-weight: 500;
    color: var(--color-grey-600);
  }
`;

function CheckinBooking() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking(id!);
  const { checkinTrigger, isChecking } = useCheckin(id!);
  const { data: settings } = useSWRImmutable('settings', settingsFetcher);

  useEffect(() => {
    if (booking?.is_paid) setConfirmPaid(booking.is_paid);
  }, [booking?.is_paid]);

  if (isLoading) return <Spinner $size="lg" $variant="primary" />;
  if (!booking) return null;

  const { guests, total_price, has_breakfast, guests_count, nights } = booking;
  const isCheckedIn = booking.status === 'checked-in';
  const isCheckinBtnDisabled = !confirmPaid || isCheckedIn || isChecking;

  // Calculate the breakfast price and recalculate the total price if the
  // user wants to add breakfast check-in time.
  const breakfastPrice =
    (settings?.breakfast_price ?? 0) * guests_count * nights;
  const totalPrice = total_price + breakfastPrice * Number(addBreakfast);

  function handleCheckin() {
    if (!id) return;
    checkinTrigger({
      totalPrice,
      breakfastPrice,
      hasBreakfast: addBreakfast,
    });
  }

  return (
    <>
      <Row $justify="between">
        <h3>Check in booking #{id}</h3>
        <Button $variant="link" $size="initial" onClick={moveBack}>
          &larr; Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => setAddBreakfast(add => !add)}
          />
          <label htmlFor="breakfast">
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </label>
        </Box>
      )}

      <Box>
        <Checkbox
          id="payment-confirmation"
          checked={confirmPaid}
          disabled={booking.is_paid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
        />
        <label htmlFor="payment-confirmation">
          I confirm that {guests?.fullname} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}{' '}
          {addBreakfast &&
            `(${formatCurrency(total_price)} + ${formatCurrency(breakfastPrice)} breakfast)`}
        </label>
      </Box>

      <Row $justify="end" $gap="0.75rem">
        <Button disabled={isCheckinBtnDisabled} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
        <Button $variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </Row>
    </>
  );
}

export default CheckinBooking;
