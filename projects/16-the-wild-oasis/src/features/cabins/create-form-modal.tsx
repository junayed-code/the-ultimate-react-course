import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import Row from '@ui/row';
import Modal from '@ui/modal';
import Button from '@ui/button';
import Heading from '@ui/heading';
import CabinForm from '@components/cabin-form';
import { CreateCabinSchema } from '@/schemas';
import { createCabin, CabinInsert } from '@services/api/cabins';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialValues: Record<keyof CabinInsert, any> = {
  name: '',
  image: '',
  price: '',
  capacity: '',
  discount: '',
  description: '',
};

function CreateCabinFormModal() {
  const { trigger, isMutating } = useSWRMutation('cabins', createCabin);

  return (
    <Modal>
      {({ handleClose }) => (
        <>
          <Modal.Open as={Button}>Add Cabin</Modal.Open>
          <Modal.Box $size="large">
            <Modal.Header $mb="1.5rem">
              <Heading as="h5" $size="1.125rem">
                Create a new cabin
              </Heading>
            </Modal.Header>
            <CabinForm
              initialValues={initialValues}
              validationSchema={CreateCabinSchema}
              onSubmit={async (values, actions) => {
                try {
                  await trigger(values);
                  toast.success('Successfully created a new cabin');
                  actions.resetForm();
                  handleClose(); // Close the modal
                } catch (error) {
                  toast.error((error as Error).message);
                }
              }}
            >
              <Row $direction="horizontal" $justify="end" $gap="1rem">
                <Button type="reset" $variant="secondary">
                  Clear
                </Button>
                <Button type="submit" disabled={isMutating}>
                  Create Cabin
                </Button>
              </Row>
            </CabinForm>
          </Modal.Box>
        </>
      )}
    </Modal>
  );
}

export default CreateCabinFormModal;
