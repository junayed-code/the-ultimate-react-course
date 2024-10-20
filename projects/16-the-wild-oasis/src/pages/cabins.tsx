import styled from 'styled-components';

import Row from '@ui/row';
import Sort from '@ui/sort';
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
        <Row $gap="0.75rem">
          <Sort>
            <Sort.Option value="name">Sort by name (asc)</Sort.Option>
            <Sort.Option value="-name">Sort by name (desc)</Sort.Option>
            <Sort.Option value="price">Sort by price (low)</Sort.Option>
            <Sort.Option value="-price">Sort by price (high)</Sort.Option>
            <Sort.Option value="capacity">Sort by capacity (low)</Sort.Option>
            <Sort.Option value="-capacity">Sort by capacity (high)</Sort.Option>
          </Sort>
          <Filter by="discount">
            <Filter.Option value="0">No discount</Filter.Option>
            <Filter.Option value="0" arg="ne">
              With discount
            </Filter.Option>
          </Filter>
          <CreateCabinFormModal />
        </Row>
      </Row>

      <CabinTable />
    </StyledContainer>
  );
}

export default Cabins;
