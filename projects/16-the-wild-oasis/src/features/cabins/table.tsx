import useSWR from 'swr';

import Table from '@ui/table';
import Spinner from '@ui/spinner';
import CabinRow from '@features/cabins/row';
import { cabinsFetcher } from '@services/api/cabins';

function CabinTable() {
  const { data: cabins, isLoading } = useSWR('cabins', cabinsFetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Column as="th">#</Table.Column>
          <Table.Column as="th">Cabin</Table.Column>
          <Table.Column as="th">Capacity</Table.Column>
          <Table.Column as="th">Price</Table.Column>
          <Table.Column as="th">Discount</Table.Column>
          <Table.Column as="th"></Table.Column>
        </Table.Row>
      </Table.Header>

      {/* Render the CabinRows */}
      <Table.Body
        data={cabins!}
        render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
