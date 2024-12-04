import styled from 'styled-components';

import Row from '@ui/row';
import Filter from '@ui/filter';
import Container from '@ui/container';
import DashboardLayout from '@features/dashboard/layout';

const StyledContainer = styled(Container)`
  min-width: 60rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function Dashboard() {
  return (
    <StyledContainer>
      <Row $justify="between">
        <h3>Dashboard</h3>
        <Filter by="last">
          <Filter.Option value="7">Last 7 days</Filter.Option>
          <Filter.Option value="30">Last 30 days</Filter.Option>
          <Filter.Option value="90">Last 90 days</Filter.Option>
        </Filter>
      </Row>
      <DashboardLayout />
    </StyledContainer>
  );
}

export default Dashboard;
