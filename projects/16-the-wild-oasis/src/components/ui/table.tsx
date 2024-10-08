import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  display: table;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
  border: 1px solid var(--color-grey-100);
  --border: 1px solid var(--color-grey-200);

  & :where(th, td) {
    vertical-align: middle;
  }

  & tr:not(:last-child) {
    border-bottom: var(--border);
  }
`;

const StyledHeader = styled.thead`
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border-bottom: var(--border);
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
`;

const StyledBody = styled.tbody``;

const StyledColumn = styled.td`
  padding: ${({ as: _as }) =>
    _as === 'th' ? '0.875rem 0.75rem' : '0.25rem 0.75rem'};
`;

type TableProps = React.ComponentProps<typeof StyledTable>;

function Table({ ...props }: TableProps) {
  return <StyledTable {...props} />;
}

type BodyProps<T> = React.ComponentProps<typeof StyledBody> & {
  data: T[];
  render(e: T): React.ReactNode;
};

function Body<T>({ data, render, children: _, ...props }: BodyProps<T>) {
  return <StyledBody {...props}>{data?.map(render)}</StyledBody>;
}

Table.Body = Body;
Table.Row = styled.tr``;
Table.Header = StyledHeader;
Table.Column = StyledColumn;
Table.Footer = styled.tfoot``;

export default Table;
