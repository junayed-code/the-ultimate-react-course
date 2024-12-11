import styled from 'styled-components';

import Row from '@ui/row';
import Logo from '@ui/logo';
import SendResetMailForm from '@features/auth/send-reset-mail-form';

const StyledForgotPassword = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 26.25rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
`;

const Header = styled.div`
  & > *:first-child {
    margin-bottom: 1.25rem;
  }
`;

function ForgotPassword() {
  return (
    <StyledForgotPassword>
      <Header>
        <Logo />
        <Row $direction="vertical" $align="start" $gap="0.125rem">
          <h4>Reset Your Password</h4>
          <p style={{ fontSize: '0.875rem' }}>
            Type in your email and we&apos;ll send you a link to reset your
            password
          </p>
        </Row>
      </Header>
      <SendResetMailForm />
    </StyledForgotPassword>
  );
}

export default ForgotPassword;
