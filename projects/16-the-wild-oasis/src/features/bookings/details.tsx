import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import ConfirmDeleteModal from '@ui/confirm-delete-modal';
import BookingDataBox from '@features/bookings/data-box';
import { type ModalContextValue } from '@ui/modal';

import { useBooking, useDeleteBooking } from '@hooks/bookings';
import { useMoveBack } from '@hooks/use-move-back';
import { pickTagVariant } from '@utils/pick-tag-variant';

const ModalOpenButton = styled(Button).attrs({
  $variant: 'danger',
  children: 'Delete Booking',
})``;

type ButtonProps = React.ComponentProps<typeof Button>;
const LinkButton = styled(Link).attrs<ButtonProps>({
  $size: 'md',
  $variant: 'primary',
})`
  ${Button.componentStyle.rules}
`;

function BookingDetails() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking(id!);
  const { bookingDeleteTrigger, isBookingDeleting } = useDeleteBooking(
    Number(id),
  );

  if (isLoading) return <Spinner $size="lg" $variant="primary" />;
  if (!booking) return null;

  const { status } = booking;

  function handleDeleteBooking(arg: ModalContextValue) {
    bookingDeleteTrigger().finally(arg.handleClose).then(moveBack);
  }

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

      <Row $justify="end" $gap="0.75rem">
        {status === 'unconfirmed' && (
          <LinkButton to={`/checkin/${id}`}>Check in</LinkButton>
        )}
        <ConfirmDeleteModal
          resourceName={`booking#${id}`}
          OpenButtonCom={ModalOpenButton}
          isDeleting={isBookingDeleting}
          onConfirm={handleDeleteBooking}
        />
        <Button $variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </Row>
    </>
  );
}

export default BookingDetails;
