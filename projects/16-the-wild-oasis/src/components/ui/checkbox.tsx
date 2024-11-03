import type React from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  &[type='checkbox'] {
    height: 1.25rem;
    width: 1.25rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
    &:disabled {
      accent-color: var(--color-brand-600);
    }
  }
`;

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

function Checkbox({ ...props }: CheckboxProps) {
  return <StyledCheckbox {...props} />;
}

export default Checkbox;
