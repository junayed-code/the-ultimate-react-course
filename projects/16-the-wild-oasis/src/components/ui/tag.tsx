import styled, { css } from 'styled-components';

const variants = {
  $variant: {
    default: css`
      color: var(--color-blue-700);
      background-color: var(--color-blue-100);
    `,
    primary: css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
    `,
    secondary: css`
      color: var(--color-silver-700);
      background-color: var(--color-silver-100);
    `,
  },
};

type TagProps<V extends typeof variants = typeof variants> = {
  [R in keyof V]?: keyof V[R];
};

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 100px;
  ${({ $variant = 'default' }) => $variant && variants.$variant[$variant]}
`;

export default Tag;
