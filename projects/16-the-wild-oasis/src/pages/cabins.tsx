import styled from 'styled-components';

import Row from '@ui/row';
import Button from '@ui/button';
import CabinTable from '@features/cabins/table';
import CreateCabinForm from '@features/cabins/create-form';

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
      <Row $direction="horizontal" $justify="between">
        <h3>All cabins</h3>
        <Row $direction="horizontal" $gap="1rem">
          <p>Filter/Sort</p>
          <Button>Add Cabin</Button>
        </Row>
      </Row>

      <CabinTable />
      <CreateCabinForm />
    </Container>
  );
}

export default Cabins;
