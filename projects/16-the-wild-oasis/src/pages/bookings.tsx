import Row from '@ui/row';
import Sort from '@ui/sort';
import Filter from '@ui/filter';
import Container from '@ui/container';
import BookingTable from '@features/bookings/table';

function Bookings() {
  return (
    <Container>
      <Row $justify="between">
        <h3>All bookings</h3>
        <Row $gap="0.75rem">
          {/* Filter bookings by their status */}
          <Filter by="status" title="filter by status">
            <Filter.Option value="unconfirmed">unconfirmed</Filter.Option>
            <Filter.Option value="checked-in">checked-in</Filter.Option>
            <Filter.Option value="checked-out">checked-out</Filter.Option>
          </Filter>

          {/* Sort bookings by their date and price in ascending or descending order */}
          <Sort>
            <Sort.Option value="-start_date">
              sort by date (recent first)
            </Sort.Option>
            <Sort.Option value="start_date">
              sort by date (earlier first)
            </Sort.Option>
            <Sort.Option value="-total_price">
              sort by amount (high first)
            </Sort.Option>
            <Sort.Option value="total_price">
              sort by amount (low first)
            </Sort.Option>
          </Sort>
        </Row>
      </Row>

      <BookingTable />
    </Container>
  );
}

export default Bookings;
