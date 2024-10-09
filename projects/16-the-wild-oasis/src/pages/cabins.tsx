import styled from 'styled-components';

import Row from '@ui/row';
import Filter from '@ui/filter';
import Container from '@ui/container';
import CabinTable from '@features/cabins/table';
import CreateCabinFormModal from '@features/cabins/create-form-modal';

const StyledContainer = styled(Container)`
  min-width: 58rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function Cabins() {
  return (
    <StyledContainer>
      <Row $justify="between">
        <h3>All cabins</h3>
        <Row $gap="1rem">
          <Filter by="discount">
            <Filter.Option value="no">No discount</Filter.Option>
            <Filter.Option value="yes">With discount</Filter.Option>
          </Filter>
          <CreateCabinFormModal />
        </Row>
      </Row>

      <CabinTable />
    </StyledContainer>
  );
}

export default Cabins;
