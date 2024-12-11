import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, FormikConfig } from 'formik';

import Row from '@ui/row';
import Input from '@ui/input';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { Form, FormField, FormGroup, FormLabel, FormMessage } from '@ui/form';

import { useLogin } from '@hooks/auth';
import { LoginSchema } from '@/schemas';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-200);
  & > div:last-child {
    margin-top: 0.75rem;
  }
`;

const StyledPasswordLabel = styled(FormLabel)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    font-weight: 400;
    color: var(--color-grey-600);
    text-decoration: underline;
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
          <StyledPasswordLabel>
            Password <Link to="/forgot-password">Forgot password?</Link>
          </StyledPasswordLabel>
          <FormField type="password" as={Input} />
          <FormMessage />
        </FormGroup>
        {/* Form submit button */}
        <Row $align="stretch" $direction="vertical">
          <Button disabled={isLogin}>
            {isLogin ? <Spinner $size="sm" /> : 'Login'}
          </Button>
        </Row>
      </StyledForm>
    </Formik>
  );
}

export default LoginForm;
