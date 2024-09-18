import useSWR from 'swr';
import styled from 'styled-components';

import Spinner from '@components/ui/spinner';
import CabinRow from '@features/cabins/row';
import { cabinsFetcher } from '@services/api/cabins';

const Table = styled.div`
  font-size: 0.875rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr 2.2fr 1fr 1fr 1.4fr;
  column-gap: 1.24rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 0.875rem 1rem;
`;

function CabinTable() {
  const { data: cabins, isLoading } = useSWR('cabins', cabinsFetcher);

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <div>#</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </TableHeader>

      {/* Render the CabinRows */}
      {cabins?.map?.(cabin => <CabinRow key={cabin.id} cabin={cabin} />)}
    </Table>
  );
}

export default CabinTable;
