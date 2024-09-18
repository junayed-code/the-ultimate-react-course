import toast from 'react-hot-toast';
import styled from 'styled-components';
import { mutate } from 'swr';
import { HiPencil, HiTrash } from 'react-icons/hi2';

import Button from '@components/ui/button';
import UpdateCabinForm from '@features/cabins/update-form';
import { Tables } from '@services/supabase/database.types';
import { formatCurrency } from '@utils/helpers';
import { deleteCabin } from '@services/api/cabins';
import { useState } from 'react';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 1.25rem;
  align-items: center;
  padding: 0.875rem 1.25rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Name = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const TableRowAction = styled.div`
  & > button:nth-child(odd) {
    margin-right: 0.5rem;
  }
`;

type CabinRowProps = { cabin: Tables<'cabins'> };

function CabinRow({ cabin }: CabinRowProps) {
  const [showForm, setShowForm] = useState(false);
  const { name, capacity, image, price, discount } = cabin;

  const handleDeleteCabin = async () => {
    try {
      await mutate('cabins', deleteCabin(cabin.id), {
        populateCache: false,
        optimisticData: current =>
          current.filter((item: Tables<'cabins'>) => item.id !== cabin.id),
      });
      toast.success('Cabin successfully deleted');
    } catch (error) {
      return toast.error((error as Error).message);
    }
  };

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Name>{name}</Name>
        <div>Fits up to {capacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        <Discount>{formatCurrency(discount || 0)}</Discount>
        <TableRowAction>
          <Button $size="icon" onClick={() => setShowForm(show => !show)}>
            <HiPencil />
          </Button>
          <Button $size="icon" $variant="danger" onClick={handleDeleteCabin}>
            <HiTrash />
          </Button>
        </TableRowAction>
      </TableRow>

      {/* Show the update cabin form */}
      {showForm && (
        <UpdateCabinForm
          initialValues={cabin}
          onUpdate={() => setShowForm(false)}
        />
      )}
    </>
  );
}

export default CabinRow;
