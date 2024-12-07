import styled, { css } from 'styled-components';
import { createVariant, type VariantProps } from '@utils/create-variant';

const buttonVariant = createVariant({
  $variant: {
    primary: css`
      --color-hover: var(--color-brand-600);
      color: var(--color-brand-50);
      background-color: var(--color-brand-500);
    `,
    secondary: css`
      --color-hover: var(--color-grey-100);
      color: var(--color-grey-600);
      background: var(--color-grey);
      border-color: var(--color-grey-300);
    `,
    danger: css`
      --color-hover: var(--color-red-800);
      color: var(--color-red-100);
      background-color: var(--color-red-700);
    `,
    link: css`
      color: var(--color-brand-500);
      background-color: initial;
      &:enabled:hover {
        color: var(--color-brand-600);
      }
    `,
  },
  $size: {
    initial: css`
      font-size: 0.875rem;
    `,
    sm: css`
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      letter-spacing: 0.02rem;
      text-transform: uppercase;
    `,
    md: css`
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    `,
    lg: css`
      font-size: 1rem;
      padding: 0.625rem 1.75rem;
    `,
    icon: css`
      width: 2.375rem;
      height: 2.375rem;
      font-size: 1rem;
    `,
  },
});

const Button = styled.button<VariantProps<typeof buttonVariant>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  transition:
    transform 200ms ease-in-out,
    background-color 300ms ease-in-out;

  &:not(:disabled):hover {
    background-color: var(--color-hover);
  }
  &:not(:disabled):active {
    transform: scale(0.95);
  }

  ${({ $size, $variant }) => buttonVariant({ $variant, $size })}
`;

Button.defaultProps = { $variant: 'primary', $size: 'md' };

export default Button;
