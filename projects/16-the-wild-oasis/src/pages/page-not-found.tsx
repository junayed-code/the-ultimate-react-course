import styled from 'styled-components';

import Button from '@ui/button';
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
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  flex: 0 1 35rem;
  text-align: center;
  line-height: 1.2;

  h3 {
    margin-bottom: 1rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <h3>The page you are looking for could not be found 😢</h3>
        <Button onClick={moveBack}>&larr; Go back</Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
