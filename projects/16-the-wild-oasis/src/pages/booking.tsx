import styled from 'styled-components';

import Container from '@ui/container';
import BookingDetails from '@features/bookings/details';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Booking() {
  return (
    <StyledContainer>
      <BookingDetails />
    </StyledContainer>
  );
}

export default Booking;
