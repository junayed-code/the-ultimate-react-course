import { useParams } from 'react-router-dom';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import BookingDataBox from '@features/bookings/data-box';

import { useBooking } from '@hooks/bookings';
import { useMoveBack } from '@hooks/use-move-back';
import { pickTagVariant } from '@utils/pick-tag-variant';

function BookingDetails() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking(id!);

  if (isLoading) return <Spinner />;
  if (!booking) return null;

  const { status } = booking;

  return (
    <>
      <Row $gap="1.25rem" $justify="between">
        <Row $gap="1rem">
          <h3>Booking #{id}</h3>
          <Tag $variant={pickTagVariant(status)}>
            {status.replace('-', ' ')}
          </Tag>
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
