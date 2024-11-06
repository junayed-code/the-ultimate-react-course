import styled, { css, keyframes } from 'styled-components';
import { createVariant, type VariantProps } from '@utils/create-variant';

const spinnerVariant = createVariant({
  $variant: {
    default: css`
      --gradient-color: var(--color-grey);
    `,
    primary: css`
      --gradient-color: var(--color-brand-600);
    `,
    secondary: css`
      --gradient-color: var(--color-grey-600);
    `,
  },
  $size: {
    sm: css`
      --width: 1.25rem;
      --thickness: 2.5px;
    `,
    md: css`
      --width: 2.5rem;
      --margin: 1.5rem auto;
      --thickness: 5px;
    `,
    lg: css`
      --width: 4rem;
      --margin: 3rem auto;
      --thickness: 8px;
    `,
  },
});

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div<VariantProps<typeof spinnerVariant>>`
  ${({ $size, $variant }) => spinnerVariant({ $size, $variant })}

  width: var(--width);
  margin: var(--margin);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--gradient-color) 94%, #0000)
      top/var(--thickness) var(--thickness) no-repeat,
    conic-gradient(#0000 30%, var(--gradient-color));
  mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - var(--thickness)),
    #000 0
  );
  animation: ${rotate} 1.5s infinite linear;
`;

Spinner.defaultProps = { $size: 'md', $variant: 'default' };

export default Spinner;
