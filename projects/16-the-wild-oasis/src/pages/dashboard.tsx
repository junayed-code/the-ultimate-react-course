import Row from '@ui/row';
import Filter from '@ui/filter';
import Container from '@ui/container';
import DashboardLayout from '@features/dashboard/layout';

function Dashboard() {
  return (
    <Container>
      <Row $justify="between">
        <h3>Dashboard</h3>
        <Filter by="last">
          <Filter.Option value="7">Last 7 days</Filter.Option>
          <Filter.Option value="30">Last 30 days</Filter.Option>
          <Filter.Option value="90">Last 90 days</Filter.Option>
        </Filter>
      </Row>
      <DashboardLayout />
    </Container>
  );
}

export default Dashboard;
