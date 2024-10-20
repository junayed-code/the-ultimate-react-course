import React from 'react';
import styled, { css } from 'styled-components';
import { HiChevronDown } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';

import Menu from '@ui/menu';

const FilterToggle = styled(Menu.Toggle)`
  font-style: italic;
  text-transform: uppercase;
  color: var(--color-grey-700);

  details[open] & svg {
    transform: rotate(180deg);
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-grey-700);
    transition: transform 300ms;
  }
`;

const FilterDropdown = styled(Menu.List)`
  min-width: 12rem;
`;

const FilterButton = styled<typeof Menu.Button, { $active?: boolean }>(
  Menu.Button,
)`
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  color: var(--color-grey-600);
  background-color: var(--color-grey-100);
  &:enabled:active {
    transform: none;
  }
  &:enabled:hover {
    color: var(--color-grey);
    background-color: var(--color-brand-600);
  }

  ${({ $active }) =>
    $active &&
    css`
      color: var(--color-grey);
      background-color: var(--color-brand-600);
    `}
`;

type FilterButtonProps = React.ComponentProps<typeof Menu.Button> & {
  value: string;
  arg?: 'e' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte';
};

function FilterOption({ value, arg, ...props }: FilterButtonProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { by } = React.useContext(FilterContext);
  const key = arg ? `${by}[${arg}]` : by;
  const currKey = [...searchParams.keys()].find(key => key.startsWith(by));
  const isActive = key === currKey;

  const handleClick = () => {
    if (isActive) searchParams.delete(key);
    else {
      searchParams.delete(currKey!);
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  return <FilterButton {...props} $active={isActive} onClick={handleClick} />;
}

const FilterContext = React.createContext({} as { by: string });

type FilterProps = React.ComponentProps<typeof Menu> & {
  by: string;
};

function Filter({ by, title, children, ...props }: FilterProps) {
  return (
    <Menu {...props}>
      <FilterContext.Provider value={{ by }}>
        <FilterToggle>
          {title ?? 'Filter by'} <HiChevronDown />
        </FilterToggle>
        <FilterDropdown>{children}</FilterDropdown>
      </FilterContext.Provider>
    </Menu>
  );
}

Filter.Option = FilterOption;

export default Filter;
