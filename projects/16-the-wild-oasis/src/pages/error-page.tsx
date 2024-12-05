import styled from 'styled-components';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import Button from '@ui/button';
import { useMoveBack } from '@hooks/use-move-back';

const StyledErrorPage = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  flex: 0 1 44rem;
  padding: 2rem;
  text-align: center;
  line-height: 1.2;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
    @media screen and (min-width: 48em) {
      font-size: 8rem;
    }
  }

  p {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.25rem;
    @media screen and (min-width: 48em) {
      font-size: 1.5rem;
    }
  }
`;

type ErrorMessageProps = { status: string | number; message: string };

function ErrorMessage({ status, message }: ErrorMessageProps) {
  const moveBack = useMoveBack();

  return (
    <Box>
      <h1>{status}</h1>
      <p>{message}</p>
      <Button onClick={moveBack}>&larr; Go back</Button>
    </Box>
  );
}

function ErrorPage() {
  const error = useRouteError();
  const isNotFoundError = isRouteErrorResponse(error) && error.status === 404;

  return (
    <StyledErrorPage>
      {/* Page not found error message */}
      {isNotFoundError && (
        <ErrorMessage
          status={error.status}
          message="The page you are looking for could not be found 😢"
        />
      )}
      {/* General error message */}
      {!isNotFoundError && (
        <ErrorMessage
          status={(error as { status: number })?.status ?? 500}
          message="There seems to have been an error. We will address that issue as soon as possible, please try again later."
        />
      )}
    </StyledErrorPage>
  );
}

export default ErrorPage;
