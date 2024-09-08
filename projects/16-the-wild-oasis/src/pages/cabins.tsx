import styled from 'styled-components';

import Row from '@ui/row';
import CabinTable from '@features/cabins/table';

const Container = styled.div`
  width: 58rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  padding: 1rem 1.25rem 2rem 0;
`;

function Cabins() {
  return (
    <Container>
      <Row $direction="horizontal">
        <h3>All cabins</h3>
        <p>Filter/Sort</p>
      </Row>
      <CabinTable />
    </Container>
  );
}

export default Cabins;
