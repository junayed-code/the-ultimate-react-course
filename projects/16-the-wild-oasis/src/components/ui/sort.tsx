import React from 'react';
import styled from 'styled-components';
import { HiChevronDown } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

import Button from '@ui/button';

const StyledSort = styled.label`
  position: relative;
  font-size: 0.875rem;

  span {
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 0.4rem;
    transform: translateY(-50%);
    pointer-events: none;

    svg {
      width: 1.25rem;
      height: 1.25rem;
      color: var(--color-grey-700);
      transition: transform 300ms;
    }
  }

  select:focus-visible + span svg {
    transform: rotate(180deg);
  }
`;

const StyledSelect = styled(Button).attrs<
  React.HTMLAttributes<HTMLSelectElement>
>({
  as: 'select',
  $variant: 'secondary',
})`
  outline: none;
  text-align: left;
  font-style: italic;
  text-transform: uppercase;
  color: var(--color-grey-700);
  appearance: none;
  padding-right: 2rem;

  &:enabled {
    &:hover {
      background-color: initial;
    }
    &:active {
      transform: none;
    }
  }
`;

const StyledOption = styled.option``;

type SortProps = React.ComponentProps<typeof StyledSelect>;

function Sort({ children, ...props }: SortProps) {
  const id = React.useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('sort') ?? undefined;

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.currentTarget.value);
    setSearchParams(searchParams);
  };

  return (
    <StyledSort htmlFor={id}>
      <StyledSelect
        id={id}
        onChange={handleChange}
        defaultValue={value}
        {...props}
      >
        {children}
      </StyledSelect>
      <span>
        <HiChevronDown />
      </span>
    </StyledSort>
  );
}

type SortOptionProps = React.ComponentProps<typeof StyledOption>;

function SortOption({ ...props }: SortOptionProps) {
  return <StyledOption {...props} />;
}

Sort.Option = SortOption;

export default Sort;
