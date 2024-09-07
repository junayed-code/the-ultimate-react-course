import styled from 'styled-components';

import Button from '@ui/button';
import Heading from '@ui/heading';
import { useMoveBack } from '@hooks/use-move-back';

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Box = styled.div`
  width: 100%;
  max-width: 48rem;

  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  flex: 0 1 96rem;
  text-align: center;
  line-height: 1.2;

  & h1 {
    margin-bottom: 1.5rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} size="lg">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
