import styled from 'styled-components';

import Row from '@ui/row';
import Button from '@ui/button';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

const StyledPagination = styled(Row).attrs({
  $width: 'full',
  $justify: 'between',
})`
  p {
    font-style: italic;
    span {
      font-weight: 600;
    }
  }
`;

const PaginationButton = styled(Button).attrs({ $variant: 'secondary' })`
  border: none;

  &:enabled:hover {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`;

type PaginationProps = {
  count: number;
  page: number;
  to: number;
  from: number;
};

function Pagination({ count, page, from, to }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstPage = page === 1,
    isLastPage = count === to;

  const handleNextPage = () => {
    const value = (isLastPage ? page : page + 1) + '';
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    const value = (isFirstPage ? page : page - 1) + '';
    if (value === '1') searchParams.delete('page');
    else searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  return (
    <StyledPagination>
      <p>
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span>{' '}
        results
      </p>

      <Row $gap="0.75rem">
        <PaginationButton onClick={handlePrevPage} disabled={isFirstPage}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={handleNextPage} disabled={isLastPage}>
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </Row>
    </StyledPagination>
  );
}

export default Pagination;
