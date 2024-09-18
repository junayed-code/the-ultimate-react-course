import styled from 'styled-components';

import Row from '@ui/row';
import Button from '@ui/button';
import CabinForm from '@components/cabin-form';
import { UpdateCabinSchema } from '@/schemas';
import { updateCabin } from '@/services/api/cabins';
import { Tables } from '@services/supabase/database.types';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';

type UpdateCabinValues = Omit<Tables<'cabins'>, 'image'> & {
  image: string | File;
};

const StyledCabinForm = styled(CabinForm<UpdateCabinValues>)`
  width: 100%;
  max-width: 48rem;
  margin-inline: auto;
  padding: 1.5rem 1rem;
`;

type CabinUpdateFormProps = {
  initialValues: UpdateCabinValues;
  onUpdate?: () => void;
};

function UpdateCabinForm({ initialValues, onUpdate }: CabinUpdateFormProps) {
  const { trigger, isMutating } = useSWRMutation('cabins', updateCabin, {
    onSuccess() {
      toast.success('The cabin successfully updated');
      onUpdate?.();
    },
    onError: error => toast.error(error.message),
  });

  const handleSubmit = (values: UpdateCabinValues) => {
    const image = {
      path: initialValues.image as string,
      file: typeof values.image !== 'string' ? values.image : undefined,
    };
    trigger({ ...values, image });
  };

  return (
    <StyledCabinForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={UpdateCabinSchema}
    >
      <Row $direction="horizontal" $justify="end">
        <Button type="submit" disabled={isMutating}>
          Update Cabin
        </Button>
      </Row>
    </StyledCabinForm>
  );
}

export default UpdateCabinForm;
