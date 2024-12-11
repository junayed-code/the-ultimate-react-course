import React from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { Form, Formik, type HandleSubmit } from '@ui/form';
import { FormGroup, FormField, FormLabel, FormMessage } from '@ui/form';

import { useUserMutation } from '@hooks/auth';
import { UpdatePasswordFormSchema } from '@/schemas';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & > div:last-child {
    margin-top: 0.75rem;
  }
`;

const initialValues = {
  password: '',
  confirmPassword: '',
};

type UpdatePasswordFormProps = React.ComponentProps<typeof StyledForm>;

function UpdatePasswordForm({ children, ...props }: UpdatePasswordFormProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleUserMutation } = useUserMutation();

  const handleSubmit: HandleSubmit<typeof initialValues> = (
    { password },
    actions,
  ) => {
    // Update the user password
    return handleUserMutation(
      { password },
      {
        onSuccess() {
          toast.success('Your password has been successfully updated');
          actions.resetForm();
          if (pathname !== '/account') {
            navigate('/account', { replace: true });
          }
        },
        onError() {
          toast.error('An error happened while updating your password');
        },
      },
    ).catch(console.error);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={UpdatePasswordFormSchema}
    >
      <StyledForm {...props}>{children}</StyledForm>
    </Formik>
  );
}

UpdatePasswordForm.Fields = function Fields() {
  return (
    <>
      <FormGroup name="password">
        <FormLabel>Enter new password</FormLabel>
        <FormField type="password" as={Input} />
        <FormMessage />
      </FormGroup>

      <FormGroup name="confirmPassword">
        <FormLabel>Re-type new password</FormLabel>
        <FormField type="password" as={Input} />
        <FormMessage />
      </FormGroup>
    </>
  );
};

type SubmitButtonProps = React.ComponentProps<typeof Row>;

UpdatePasswordForm.SubmitButton = function SubmitButton(
  props: SubmitButtonProps,
) {
  const { isSubmitting } = useFormikContext();

  return (
    <Row $direction="vertical" {...props}>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner $size="sm" />} Update Password
      </Button>
    </Row>
  );
};

export default UpdatePasswordForm;
