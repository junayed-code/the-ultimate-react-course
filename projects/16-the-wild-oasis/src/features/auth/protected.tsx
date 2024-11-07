import { Suspense } from 'react';
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
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {protect === 'authenticated' && <ProtectedAuthenticated />}
      {protect === 'unauthenticated' && <ProtectedUnauthenticated />}
    </Suspense>
  );
}

function ProtectedAuthenticated() {
  const location = useLocation();
  const { isAuthenticated } = useAuth({ suspense: true });

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={location} />
  );
}

function ProtectedUnauthenticated() {
  const { isAuthenticated } = useAuth({ suspense: true });
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
