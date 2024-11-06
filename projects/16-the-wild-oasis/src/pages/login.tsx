import styled from 'styled-components';

import Row from '@ui/row';
import Logo from '@ui/logo';
import LoginForm from '@features/auth/login-form';

const LoginLayout = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 26.25rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
  background-color: var(--color-grey-50);
`;

const Header = styled(Row).attrs({ $direction: 'vertical', $gap: '0.75rem' })`
  text-align: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Header>
        <Logo />
        <h4>Login to your account</h4>
      </Header>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
