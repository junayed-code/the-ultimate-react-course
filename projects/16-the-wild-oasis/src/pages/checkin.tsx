import styled from 'styled-components';

import Container from '@ui/container';
import CheckinBooking from '@features/check-in-out/booking';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Checkin() {
  return (
    <StyledContainer>
      <CheckinBooking />
    </StyledContainer>
  );
}

export default Checkin;
