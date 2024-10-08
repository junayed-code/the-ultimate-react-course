import { mutate } from 'swr';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import useSWRMutation from 'swr/mutation';
import { HiEllipsisVertical, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import Menu from '@ui/menu';
import Table from '@ui/table';
import ConfirmDeleteModal from '@ui/confirm-delete-modal';
import UpdateCabinFormModal from '@features/cabins/update-form-modal';

import { formatCurrency } from '@utils/helpers';
import { Tables } from '@services/supabase/database.types';
import { createCabin, deleteCabin } from '@services/api/cabins';

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const StyledColumn = styled(Table.Column)`
  font-weight: 500;
`;

const DiscountColumn = styled(StyledColumn)`
  color: var(--color-green-700);
`;

const ModalOpenButton = styled(Menu.Button).attrs({
  children: (
    <>
      <HiTrash /> Delete
    </>
  ),
})``;

type CabinRowProps = { cabin: Tables<'cabins'> };

function CabinRow({ cabin }: CabinRowProps) {
  const { name, capacity, image, price, discount } = cabin;

  // Delete a cabin mutation
  const { trigger, isMutating } = useSWRMutation(
    'cabins',
    () => deleteCabin(cabin.id),
    {
      onSuccess() {
        toast.success('The cabin successfully deleted');
      },
      onError(error) {
        toast.error(error.message);
      },
    },
  );

  const handleDuplicateCabin = async () => {
    try {
      const id = Math.ceil(Math.random() * cabin.id);
      const arg = { ...cabin, name: `${name} Copy`, id };
      await mutate('cabins', createCabin('', { arg }), {
        populateCache: false,
        optimisticData: current => [...current, arg],
      });
      toast.success('The cabin successfully copied');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Table.Row>
      <Table.Column>
        <Img src={image} />
      </Table.Column>
      <StyledColumn>{name}</StyledColumn>
      <Table.Column>Fits up to {capacity} guests</Table.Column>
      <StyledColumn>{formatCurrency(price)}</StyledColumn>
      <DiscountColumn>{formatCurrency(discount || 0)}</DiscountColumn>
      <Table.Column>
        <Menu>
          <Menu.Toggle $size="icon">
            <HiEllipsisVertical />
          </Menu.Toggle>
          <Menu.List>
            <Menu.Item>
              <Menu.Button onClick={handleDuplicateCabin}>
                <HiSquare2Stack /> Duplicate
              </Menu.Button>
            </Menu.Item>

            <Menu.Item>
              <UpdateCabinFormModal cabin={cabin} />
            </Menu.Item>

            <Menu.Item>
              <ConfirmDeleteModal
                resourceName={cabin.name}
                isDeleting={isMutating}
                OpenButtonCom={ModalOpenButton}
                onConfirm={arg => trigger().then(arg.handleClose)}
              />
            </Menu.Item>
          </Menu.List>
        </Menu>
      </Table.Column>
    </Table.Row>
  );
}

export default CabinRow;
