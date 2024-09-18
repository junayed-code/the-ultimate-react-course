import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';
import { type FormikHelpers } from 'formik';

import Row from '@ui/row';
import Button from '@ui/button';
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
  description: 'This is a nice cabin.',
};

function CreateCabinForm() {
  const { trigger, isMutating } = useSWRMutation('cabins', createCabin);

  const handleSubmit = async <Values extends CabinInsert>(
    values: Values,
    actions: FormikHelpers<Values>,
  ) => {
    try {
      await trigger(values);
      toast.success('Successfully created a new cabin');
      actions.resetForm();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <CabinForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={CreateCabinSchema}
    >
      <Row $direction="horizontal" $justify="end" $gap="1rem">
        <Button $variant="secondary" type="reset">
          Reset
        </Button>
        <Button type="submit" disabled={isMutating}>
          Create Cabin
        </Button>
      </Row>
    </CabinForm>
  );
}

export default CreateCabinForm;
