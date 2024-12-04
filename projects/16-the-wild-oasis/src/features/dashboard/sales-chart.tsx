import styled from 'styled-components';
import { format } from 'date-fns';
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import Heading from '@ui/heading';
import { useTheme } from '@features/theme/context';
import { useSalesChartData } from '@hooks/use-sales-chart-data';

function getColorsByTheme(theme: string) {
  return theme === 'dark'
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extraSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: 'var(--color-grey-700)',
        background: 'var(--color-grey)',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extraSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: 'var(--color-grey-700)',
        background: 'var(--color-grey)',
      };
}

const StyledSalesChart = styled.div`
  grid-column: 1 / -1;

  padding: 1.5rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  /* Hack to change grid line colors */
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart() {
  const { theme } = useTheme();
  const { salesData, interval } = useSalesChartData();
  const colors = getColorsByTheme(theme);

  if (!salesData || !interval) return null;

  return (
    <StyledSalesChart>
      <Heading as="h4" $size="1.25rem" style={{ marginBottom: '1.25rem' }}>
        Sales from {format(interval.start, 'MMM dd yyyy')} &mdash;{' '}
        {format(interval.end, 'MMM dd yyyy')}
      </Heading>
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={salesData}>
          <CartesianGrid strokeDasharray="4 3" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            unit="$"
            type="monotone"
            name="Total sales"
            dataKey="totalSales"
            {...colors.totalSales}
          />
          <Area
            unit="$"
            type="monotone"
            name="Extras sales"
            dataKey="extraSales"
            {...colors.extraSales}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
