import styled, { css } from 'styled-components';

const sizes = {
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
};

const variants = {
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
};

type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.5rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  transition:
    transform 200ms ease-in-out,
    background-color 300ms ease-in-out;

  &:hover {
    background-color: var(--color-hover);
  }
  &:active {
    transform: scale(0.95);
  }

  ${({ size = 'md' }) => sizes[size]}
  ${({ variant = 'primary' }) => variants[variant]}
`;

export default Button;

// export { sizes, variations };
