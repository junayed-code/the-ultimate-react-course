import toast from 'react-hot-toast';
import styled from 'styled-components';
import useSWRImmutable from 'swr/immutable';
import { Form, Formik, useFormikContext } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { UpdateSettingsSchema } from '@/schemas';
import { Tables } from '@services/supabase/database.types';
import { FormGroup, FormField, FormLabel, FormMessage } from '@ui/form';
import { settingsFetcher, updateSetting } from '@services/api/settings';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  padding: 1.5rem 2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
`;

const StyledInput = styled(Input)`
  background-color: inherit;
`;

type SettingsValues = Omit<Tables<'settings'>, 'id' | 'created_at'>;

function UpdateSettingsForm() {
  const { data, mutate, isLoading } = useSWRImmutable(
    'settings',
    settingsFetcher,
  );

  const handleSubmit = async (values: SettingsValues) => {
    try {
      await updateSetting(values);
      await mutate();
      toast.success('Settings successfully changed');
    } catch (error) {
      console.error(error);
      toast.error('Settings could not be changed');
    }
  };

  if (isLoading) return <Spinner $size="lg" $variant="primary" />;

  return (
    <Formik
      initialValues={data!}
      onSubmit={handleSubmit}
      validationSchema={UpdateSettingsSchema}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <FormGroup name="min_bookings">
            <FormLabel>Minimum nights/booking</FormLabel>
            <FormField type="number" as={StyledInput} disabled={isSubmitting} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="max_bookings">
            <FormLabel>Maximum nights/booking</FormLabel>
            <FormField type="number" as={StyledInput} disabled={isSubmitting} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="guests_per_bookings">
            <FormLabel>Maximum guests/booking</FormLabel>
            <FormField type="number" as={StyledInput} disabled={isSubmitting} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="breakfast_price">
            <FormLabel>Breakfast price</FormLabel>
            <FormField type="number" as={StyledInput} disabled={isSubmitting} />
            <FormMessage />
          </FormGroup>

          <UpdateSettingsSubmitButton initialValues={data!} />
        </StyledForm>
      )}
    </Formik>
  );
}

const UpdateSettingsSubmitButton = ({
  initialValues,
}: {
  initialValues: SettingsValues;
}) => {
  const { isSubmitting, values } = useFormikContext<SettingsValues>();

  const isAnyValueChange = Object.entries(initialValues).some(
    ([key, value]) => values[key as keyof typeof values] !== value,
  );

  return (
    <Row $gap="0.75rem">
      <Button type="reset" $variant="secondary">
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting || !isAnyValueChange}>
        {isSubmitting && <Spinner $size="sm" />} Save
      </Button>
    </Row>
  );
};

export default UpdateSettingsForm;
