import styled from 'styled-components';
import { useMemo } from 'react';
import { useFormikContext } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import Previewer from '@ui/previewer';
import { Form, Formik, type HandleSubmit } from '@ui/form';
import { FormField, FormGroup, FormLabel, FormMessage } from '@ui/form';

import { useAuth, useUserMutation } from '@hooks/auth';
import { UpdateUserSchema } from '@/schemas';

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  div {
    &:first-child {
      grid-column: 1 / 3;
    }
    &:nth-child(3) {
      grid-column: 1 / -1;
    }
  }
`;

type Values = {
  email: string;
  displayName: string;
  avatar: string | File;
};

function UpdateUserDataForm() {
  const { user } = useAuth();
  const { handleUserMutation, isUserMutating } = useUserMutation();
  const initialValues = useMemo<Values>(() => {
    if (!user) return { email: '', avatar: '', displayName: '' };
    const { displayName = '', avatar = '' } = user.user_metadata;
    return { email: user.email!, avatar, displayName };
  }, [user]);
  const avatarSrc = user?.user_metadata.avatar ?? '/default-user.jpg';

  const handleSubmit: HandleSubmit<Values> = values => {
    // Filter the changed values
    const changedValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== initialValues[key as keyof Values],
      ),
    );
    if (user) {
      return handleUserMutation({ ...changedValues, user }).catch(
        console.error,
      );
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={UpdateUserSchema}
      enableReinitialize={true}
    >
      <StyledForm>
        <Row $direction="vertical" $gap="1.25rem">
          <FormGroup name="email">
            <FormLabel>Email</FormLabel>
            <FormField as={Input} disabled />
            <FormMessage />
          </FormGroup>

          <FormGroup name="displayName">
            <FormLabel>Fullname</FormLabel>
            <FormField as={Input} />
            <FormMessage />
          </FormGroup>

          <FormGroup name="avatar">
            <FormLabel>Avatar image</FormLabel>
            <FormField as={Input} type="file" accept=".png, .jpg, .jpeg" />
            <FormMessage />
          </FormGroup>
        </Row>

        {/* User's uploaded image previewer */}
        <Previewer name="avatar" src={avatarSrc} />

        {/* Form action buttons */}
        <Row $justify="end" $gap="0.75rem">
          <Button type="reset" $variant="secondary" disabled={isUserMutating}>
            Cancel
          </Button>
          <SubmitButton />
        </Row>
      </StyledForm>
    </Formik>
  );
}

function SubmitButton() {
  const { isSubmitting, isValid, dirty } = useFormikContext<Values>();
  // Disable the button when submitting the form or if it isn't valid
  // or any value hasn't changed with the initial values.
  const disabled = isSubmitting || !isValid || !dirty;

  return (
    <Button type="submit" disabled={disabled}>
      {isSubmitting && <Spinner $size="sm" />} Save
    </Button>
  );
}

export default UpdateUserDataForm;
