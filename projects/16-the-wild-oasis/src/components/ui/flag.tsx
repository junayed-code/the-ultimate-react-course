import React from 'react';
import styled from 'styled-components';

const StyledFlag = styled.img`
  width: 100%;
  display: block;
  max-width: 1.5rem;
  border-radius: var(--border-radius-tiny);
`;

type FlagProps = React.ComponentProps<typeof StyledFlag>;

function Flag(props: FlagProps) {
  if (!props.src) return null;
  return <StyledFlag {...props} />;
}

export default Flag;
