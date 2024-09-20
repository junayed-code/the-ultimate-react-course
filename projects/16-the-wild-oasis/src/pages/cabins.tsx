import styled from 'styled-components';

import Row from '@ui/row';
import Button from '@ui/button';
import Container from '@ui/container';
import CabinTable from '@features/cabins/table';
import CreateCabinForm from '@features/cabins/create-form';

const StyledContainer = styled(Container)`
  min-width: 58rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function Cabins() {
  return (
    <StyledContainer>
      <Row $direction="horizontal" $justify="between">
        <h3>All cabins</h3>
        <Row $direction="horizontal" $gap="1rem">
          <p>Filter/Sort</p>
          <Button>Add Cabin</Button>
        </Row>
      </Row>

      <CabinTable />
      <CreateCabinForm />
    </StyledContainer>
  );
}

export default Cabins;
