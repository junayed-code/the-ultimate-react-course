import React from 'react';
import styled from 'styled-components';

import Button from '@ui/button';

const StyledMenu = styled.details`
  position: relative;
  display: inline-block;

  & summary::marker,
  & summary::-webkit-details-marker {
    display: none;
  }
`;

const StyledToggle = styled(Button).attrs({
  as: 'summary',
  $variant: 'secondary',
})`
  cursor: pointer;
  font-size: 0.875rem;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  padding: 0.75rem;
  min-width: 10rem;
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  z-index: 5;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey);
  & > *:not(:last-child) {
    margin-bottom: 0.375rem;
  }
`;

const StyledItem = styled.li`
  font-size: 0.875rem;

  &,
  & > :first-child {
    border-radius: var(--border-radius-sm);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledButton = styled(Button).attrs({
  $variant: 'secondary',
})`
  width: 100%;
  border: none;
  line-height: 1.5;
  font-weight: 400;
  padding: 0.25rem 0.5rem;
  justify-content: flex-start;
  background-color: transparent;
  &:enabled:hover {
    background-color: none;
  }
`;

type MenuProps = React.ComponentProps<typeof StyledMenu>;

function Menu({ children, ...props }: MenuProps) {
  const menuRef = React.useRef<HTMLDetailsElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const guard =
        menuRef.current?.querySelector('summary') ===
          (e.target as HTMLElement).closest('summary') ||
        !menuRef.current?.open;
      if (guard) return;

      menuRef.current?.removeAttribute('open');
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <StyledMenu ref={menuRef} {...props}>
      {children}
    </StyledMenu>
  );
}

Menu.List = StyledList;
Menu.Item = StyledItem;
Menu.Toggle = StyledToggle;
Menu.Button = StyledButton;

export default Menu;
