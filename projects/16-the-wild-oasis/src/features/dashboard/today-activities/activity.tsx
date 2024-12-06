import { mutate } from 'swr';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';

import Row from '@ui/row';
import Tag from '@ui/tag';
import Flag from '@ui/flag';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { useCheckout } from '@hooks/use-checkout';

const StyledActivity = styled.li`
  display: grid;
  grid-template-columns: 5.625rem 1fr auto 5.625rem;
  align-items: center;
  justify-content: end;
  gap: 0.75rem;

  font-size: 0.875rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  span {
    width: auto;
    text-align: center;
  }
`;

const GuestName = styled.p`
  font-weight: 500;
`;

export type ActivityProps = {
  id: number;
  status: string;
  nights: number;
  guests: {
    fullname: string;
    nationality: string;
    country_flag: string;
  } | null;
};

function Activity({ id, status, nights, guests }: ActivityProps) {
  const [params] = useSearchParams();
  const { checkoutTrigger, isCheckingOut } = useCheckout(id.toString());

  function handleCheckout() {
    checkoutTrigger(undefined, {
      onSuccess({ id }) {
        toast.success(`Booking #${id} has been successfully checked out`);
        mutate(['booking-statistics', params.toString()]);
      },
    });
  }

  return (
    <StyledActivity>
      {status === 'checked-in' && <Tag>Departing</Tag>}
      {status === 'unconfirmed' && <Tag $variant="primary">Arriving</Tag>}
      <Row>
        <Flag
          src={guests?.country_flag}
          alt={`Flag of ${guests?.nationality}`}
        />
        <GuestName>{guests?.fullname}</GuestName>
      </Row>

      {/* The number of guests nights staying */}
      <div>{`${nights} night${nights > 1 ? 's' : ''}`}</div>

      {/* Action buttons */}
      {status === 'checked-in' && (
        <Button $size="sm" onClick={handleCheckout} disabled={isCheckingOut}>
          {isCheckingOut ? <Spinner $size="sm" /> : 'check out'}
        </Button>
      )}
      {status === 'unconfirmed' && (
        <Button $size="sm" as={Link} to={`/checkin/${id}`}>
          check in
        </Button>
      )}
    </StyledActivity>
  );
}

export default Activity;
