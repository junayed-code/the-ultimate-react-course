import toast from 'react-hot-toast';
import styled from 'styled-components';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { Form, Formik, type HandleSubmit } from '@ui/form';
import { FormGroup, FormField, FormLabel, FormMessage } from '@ui/form';

import supabase from '@services/supabase';
import { SendResetMailFormSchema } from '@/schemas';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StraightLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid var(--color-grey-200);
`;

const initialValues = {
  email: '',
};

function SendResetMailForm() {
  const navigate = useNavigate();

  const handleSubmit: HandleSubmit<typeof initialValues> = async values => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error('An error occurred while sending the reset password mail');
    } else {
      toast.success(
        'Success! You will receive a password reset mail, kindly check your mailbox.',
      );
      navigate('/login');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SendResetMailFormSchema}
    >
      <StyledForm>
        <FormGroup name="email">
          <FormLabel>Email</FormLabel>
          <FormField as={Input} />
          <FormMessage />
        </FormGroup>

        <Row $direction="vertical" $align="stretch" $gap="0.75rem">
          <StraightLine />
          <SubmitButton />
        </Row>
      </StyledForm>
    </Formik>
  );
}

function SubmitButton() {
  const { isSubmitting } = useFormikContext();
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? <Spinner $size="sm" /> : 'Send Reset Mail'}
    </Button>
  );
}

export default SendResetMailForm;
