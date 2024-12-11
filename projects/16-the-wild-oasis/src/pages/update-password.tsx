import styled from 'styled-components';

import Logo from '@ui/logo';
import UpdatePasswordForm from '@features/auth/update-password-form';

const StyledUpdatePassword = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 26.25rem;
  align-content: center;
  justify-content: center;
  gap: 2rem;
`;

const Header = styled.div`
  text-align: center;
  & > *:first-child {
    margin-bottom: 1.25rem;
  }
`;

function UpdatePassword() {
  return (
    <StyledUpdatePassword>
      <Header>
        <Logo />
        <h4>Update Your Password</h4>
      </Header>
      <UpdatePasswordForm>
        <UpdatePasswordForm.Fields />
        <UpdatePasswordForm.SubmitButton $align="stretch" />
      </UpdatePasswordForm>
    </StyledUpdatePassword>
  );
}

export default UpdatePassword;
