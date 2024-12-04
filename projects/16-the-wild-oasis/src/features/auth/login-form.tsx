import styled from 'styled-components';
import { Formik, Form, FormikConfig } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { FormField, FormGroup, FormLabel, FormMessage } from '@ui/form';

import { useLogin } from '@hooks/auth';
import { LoginSchema } from '@/schemas';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-200);
`;

const SubmitButton = styled(Button).attrs({ type: 'submit' })`
  &:disabled {
    opacity: 0.8;
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);
  }
`;

const initialValues = {
  email: '',
  password: '',
};

type HandleSubmit = FormikConfig<typeof initialValues>['onSubmit'];

function LoginForm() {
  const { loginTrigger, isLogin } = useLogin();

  const handleSubmit: HandleSubmit = (values, helpers) => {
    loginTrigger(values).catch(() =>
      // Set error to the password field if an error occurred
      // while login a user
      helpers.setFieldError('password', 'Incorrect email or password'),
    );
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={LoginSchema}
    >
      <StyledForm>
        <FormGroup name="email">
          <FormLabel>Email address</FormLabel>
          <FormField type="email" as={Input} />
          <FormMessage />
        </FormGroup>
        <FormGroup name="password">
          <FormLabel>Password</FormLabel>
          <FormField type="password" as={Input} />
          <FormMessage />
        </FormGroup>
        {/* Form submit button */}
        <Row $align="stretch" $direction="vertical">
          <SubmitButton disabled={isLogin}>
            {isLogin ? <Spinner $size="sm" /> : 'Login'}
          </SubmitButton>
        </Row>
      </StyledForm>
    </Formik>
  );
}

export default LoginForm;
