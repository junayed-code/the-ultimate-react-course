import styled, { css } from 'styled-components';

const variants = {
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

type RowVariantProps<V extends typeof variants = typeof variants> = Partial<
  {
    [R in keyof V]: keyof V[R];
  } & { $gap?: string }
>;

const Row = styled.div<RowVariantProps>`
  display: flex;

  ${({
    $direction = 'vertical',
    $align = 'center',
    $justify = 'start',
    $gap = '0.5rem',
  }) => css`
    align-items: ${variants.$align[$align]};
    justify-content: ${variants.$justify[$justify]};
    flex-direction: ${variants.$direction[$direction]};
    gap: ${$gap};
  `}
`;

export default Row;
