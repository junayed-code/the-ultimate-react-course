import toast from 'react-hot-toast';
import styled from 'styled-components';
import useSWRMutation from 'swr/mutation';
import { HiPencil } from 'react-icons/hi2';

import Row from '@ui/row';
import Menu from '@ui/menu';
import Modal from '@ui/modal';
import Button from '@ui/button';
import Heading from '@ui/heading';
import Spinner from '@ui/spinner';
import CabinForm from '@components/cabin-form';
import { UpdateCabinSchema } from '@/schemas';
import { updateCabin } from '@/services/api/cabins';
import { Tables } from '@services/supabase/database.types';

type CabinValues = Omit<Tables<'cabins'>, 'image'> & {
  image: string | File;
};

const StyledCabinForm = styled(CabinForm<CabinValues>)`
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
`;

type CabinUpdateFormModalProps = {
  cabin: CabinValues;
  onUpdate?: () => void;
};

function UpdateCabinFormModal({ cabin, onUpdate }: CabinUpdateFormModalProps) {
  const { trigger, isMutating } = useSWRMutation('cabins', updateCabin, {
    onSuccess() {
      toast.success('The cabin successfully updated');
      onUpdate?.();
    },
    onError: error => toast.error(error.message),
  });

  return (
    <Modal>
      {({ handleClose }) => (
        <>
          <Modal.Open as={Menu.Button}>
            <HiPencil /> Edit
          </Modal.Open>
          <Modal.Box $size="large">
            <Modal.Header $mb="1.5rem">
              <Heading as="h5" $size="1.125rem">
                Update cabin ({cabin.name})
              </Heading>
            </Modal.Header>
            <StyledCabinForm
              initialValues={cabin}
              validationSchema={UpdateCabinSchema}
              onSubmit={values => trigger(values).then(handleClose)}
            >
              <Row $direction="horizontal" $justify="end">
                <Button type="submit" disabled={isMutating}>
                  {isMutating && <Spinner $size="sm" />} Update Cabin
                </Button>
              </Row>
            </StyledCabinForm>
          </Modal.Box>
        </>
      )}
    </Modal>
  );
}

export default UpdateCabinFormModal;
