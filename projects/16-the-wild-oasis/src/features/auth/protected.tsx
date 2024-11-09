import styled from 'styled-components';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Spinner from '@ui/spinner';
import Container from '@ui/container';
import { useAuth } from '@hooks/auth';

const SpinnerContainer = styled(Container)`
  height: 100dvh;
  display: grid;
  place-items: center;
  background-color: var(--color-grey);
  position: fixed;
  inset: 0;
  z-index: 9999;
`;

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner $size="lg" $variant="primary" />
    </SpinnerContainer>
  );
}

type ProtectedProps = { protect: 'authenticated' | 'unauthenticated' };

function Protected({ protect }: ProtectedProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  switch (protect) {
    case 'authenticated':
      return isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={location} replace />
      );
    case 'unauthenticated':
      return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
  }
}

export default Protected;
