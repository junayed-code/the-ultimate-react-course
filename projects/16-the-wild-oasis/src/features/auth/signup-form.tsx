import styled from 'styled-components';
import { Formik, Form } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { FormField, FormGroup, FormLabel, FormMessage } from '@ui/form';
import type { HandleSubmit } from '@ui/form';

import { SignUpSchema } from '@/schemas';
import { useSignUp } from '@hooks/auth';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
type Values = typeof initialValues;

function SignUpForm() {
  const { signupTrigger, isSigningUp } = useSignUp();

  const handleSubmit: HandleSubmit<Values> = (values, helpers) => {
    const { name: displayName, email, password } = values;
    const optionalData = { displayName, avatar: null };
    const credentials = { email, password, optionalData };
    signupTrigger(credentials).then(() => helpers.resetForm());
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={SignUpSchema}
    >
      <StyledForm>
        <FormGroup name="name">
          <FormLabel>Fullname</FormLabel>
          <FormField type="text" as={Input} />
          <FormMessage />
        </FormGroup>

        <FormGroup name="email">
          <FormLabel>Email</FormLabel>
          <FormField type="email" as={Input} />
          <FormMessage />
        </FormGroup>

        <FormGroup name="password">
          <FormLabel>Password</FormLabel>
          <FormField type="password" as={Input} />
          <FormMessage />
        </FormGroup>

        <FormGroup name="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormField type="password" as={Input} />
          <FormMessage />
        </FormGroup>

        <Row>
          <Button $variant="secondary" type="reset" disabled={isSigningUp}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                Creating...
                <Spinner $size="sm" $variant="secondary" />
              </>
            ) : (
              'Create new user'
            )}
          </Button>
        </Row>
      </StyledForm>
    </Formik>
  );
}

export default SignUpForm;
