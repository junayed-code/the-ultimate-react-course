import styled from 'styled-components';
import { HiArrowRightStartOnRectangle } from 'react-icons/hi2';

import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { useAuth, useLogout } from '@hooks/auth';

const StyledButton = styled(Button).attrs({
  $size: 'md',
  $variant: 'secondary',
})`
  min-width: 8rem;
`;

function LogoutButton() {
  const { isAuthenticated } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  if (!isAuthenticated) return null;

  return (
    <StyledButton onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? (
        <Spinner $size="sm" $variant="secondary" />
      ) : (
        <>
          <HiArrowRightStartOnRectangle />
          Logout
        </>
      )}
    </StyledButton>
  );
}

export default LogoutButton;
