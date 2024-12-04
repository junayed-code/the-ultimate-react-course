import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from '@ui/stat';
import { formatCurrency } from '@utils/helpers';
import { useBookingStatistics } from '@hooks/bookings';

function Stats() {
  const { statistics } = useBookingStatistics();
  const { bookingsCount, salesAmount, checkInBookingsCount, occupancyRate } =
    statistics ?? {};

  return (
    <>
      <Stat $color="blue">
        <Stat.Icon>
          <HiOutlineBriefcase />
        </Stat.Icon>
        <Stat.Title>Bookings</Stat.Title>
        <Stat.Value>{bookingsCount}</Stat.Value>
      </Stat>

      <Stat $color="green">
        <Stat.Icon>
          <HiOutlineBanknotes />
        </Stat.Icon>
        <Stat.Title>Sales</Stat.Title>
        <Stat.Value>{formatCurrency(salesAmount ?? 0)}</Stat.Value>
      </Stat>

      <Stat $color="indigo">
        <Stat.Icon>
          <HiOutlineCalendarDays />
        </Stat.Icon>
        <Stat.Title>Check ins</Stat.Title>
        <Stat.Value>{checkInBookingsCount}</Stat.Value>
      </Stat>

      <Stat $color="yellow">
        <Stat.Icon>
          <HiOutlineChartBar />
        </Stat.Icon>
        <Stat.Title>Occupancy rate</Stat.Title>
        <Stat.Value>{occupancyRate}%</Stat.Value>
      </Stat>
    </>
  );
}

export default Stats;
