import React from 'react';
import styled from 'styled-components';

type Colors = 'grey' | 'yellow' | 'green' | 'blue' | 'indigo';

const StyledStat = styled.div<{ $color?: Colors }>`
  --foreground: ${({ $color }) => `var(--color-${$color}-700)`};
  --background: ${({ $color }) => `var(--color-${$color}-100)`};

  padding: 1rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  display: grid;
  grid-template-columns: 3.25rem 1fr;
  align-items: center;
  gap: 0.25rem 1rem;
`;
StyledStat.defaultProps = { $color: 'grey' };

const Icon = styled.div`
  grid-row: 1 / span 2;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--foreground);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 500;
`;

type StatProps = React.ComponentProps<typeof StyledStat>;

function Stat(props: StatProps) {
  return <StyledStat {...props} />;
}

Stat.Icon = Icon;
Stat.Title = Title;
Stat.Value = Value;

export default Stat;
