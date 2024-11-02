import { useParams } from 'react-router-dom';
import useSWRImmutable from 'swr/immutable';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import BookingDataBox from '@features/bookings/data-box';

import { useMoveBack } from '@hooks/use-move-back';
import { getBooking } from '@services/api/bookings';

const tagVariantOnStatus = {
  unconfirmed: 'default',
  'checked-in': 'primary',
  'checked-out': 'secondary',
} as const;

function BookingDetails() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const { data: booking, isLoading } = useSWRImmutable(
    ['bookings/', id!],
    getBooking,
  );

  if (isLoading) return <Spinner />;
  if (!booking) return null;

  const { status } = booking;
  const tagVariant =
    tagVariantOnStatus[status as keyof typeof tagVariantOnStatus];

  return (
    <>
      <Row $gap="1.25rem" $justify="between">
        <Row $gap="1rem">
          <h3>Booking #{id}</h3>
          <Tag $variant={tagVariant}>{status.replace('-', ' ')}</Tag>
        </Row>
        <Button $variant="link" $size="initial" onClick={moveBack}>
          &larr; Back
        </Button>
      </Row>

      <BookingDataBox booking={booking} />
    </>
  );
}

export default BookingDetails;
