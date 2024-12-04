import styled from 'styled-components';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import Heading from '@ui/heading';
import { useDurationChartData } from '@/hooks/use-duration-chart-data';

const ChartBox = styled.div`
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.5rem;
  grid-column: 3 / span 2;

  .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function DurationChart() {
  const { data, colors } = useDurationChartData();

  return (
    <ChartBox>
      <Heading as="h4" $size="1.25rem">
        Stay duration summary
      </Heading>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip
            itemStyle={{ color: 'var(--color-grey-700)' }}
            contentStyle={{ backgroundColor: 'var(--color-grey)' }}
          />
          <Pie
            cx="45%"
            data={data}
            nameKey="durationTag"
            dataKey="value"
            innerRadius={85}
            outerRadius={115}
            paddingAngle={3}
          >
            {colors?.map(color => (
              <Cell key={color} fill={color} stroke={color} />
            ))}
          </Pie>
          <Legend
            align="right"
            layout="vertical"
            verticalAlign="middle"
            iconSize={12}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
