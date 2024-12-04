import styled from 'styled-components';

import Heading from '@ui/heading';
import Activities from './activities';
import { useBookingStatistics } from '@hooks/bookings';

const StyledTodayActivities = styled.div`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  grid-column: 1 / span 2;
`;

function TodayActivities() {
  const { statistics } = useBookingStatistics();
  const { todayActivities } = statistics ?? {};

  return (
    <StyledTodayActivities>
      <Heading as="h4" $size="1.25rem">
        Today activities
      </Heading>
      <Activities activities={todayActivities} />
    </StyledTodayActivities>
  );
}

export default TodayActivities;
