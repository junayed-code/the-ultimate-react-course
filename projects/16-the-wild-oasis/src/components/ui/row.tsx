import styled, { css } from 'styled-components';

const variants = {
  $width: {
    full: '100%',
    '1/2': '50%',
    '1/4': '25%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
  },
  $direction: { vertical: 'column', horizontal: 'row' },
  $align: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
  },
  $justify: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
  },
};

type RowVariantProps<V extends typeof variants = typeof variants> = {
  [R in keyof V]?: keyof V[R];
} & { $gap?: string };

const Row = styled.div<RowVariantProps>`
  display: flex;

  ${({ $gap = '0.5rem' }) => `gap: ${$gap};`}
  ${({ $width }) => $width && `width: ${variants.$width[$width]};`}
  ${({ $direction }) =>
    $direction && `flex-direction: ${variants.$direction[$direction]};`}
  ${({ $justify }) =>
    $justify && `justify-content: ${variants.$justify[$justify]};`}
  ${({ $align = 'center' }) => css`
    align-items: ${variants.$align[$align]};
  `}
`;

export default Row;
