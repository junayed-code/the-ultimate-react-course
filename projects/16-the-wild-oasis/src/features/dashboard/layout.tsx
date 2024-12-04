import styled from 'styled-components';

import Spinner from '@ui/spinner';
import Stats from '@features/dashboard/stats';
import SalesChart from '@features/dashboard/sales-chart';
import DurationChart from '@features/dashboard/duration-chart';
import TodayActivities from '@features/dashboard/today-activities';
import { useBookingStatistics } from '@hooks/bookings';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(13.75rem, 1fr));
  grid-template-rows: auto 25rem auto;
  gap: 1.375rem;
`;

function DashboardLayout() {
  const { isLoading } = useBookingStatistics();

  if (isLoading) return <Spinner $size="lg" $variant="primary" />;

  return (
    <StyledDashboardLayout>
      <Stats />
      <TodayActivities />
      <DurationChart />
      <SalesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
