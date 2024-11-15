import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineMoon } from 'react-icons/hi2';

import Row from '@ui/row';
import Button from '@ui/button';
import Avatar from '@ui/avatar';
import LogoutButton from '@components/logout-button';

import { useAuth } from '@/hooks/auth';

const StyledHeader = styled(Row).attrs({ as: 'header', $justify: 'end' })`
  border-bottom: var(--border);
  padding: 0 var(--padding);
`;

const HeaderList = styled.ul`
  display: flex;
  gap: 0.5rem;
`;

const HeaderListItem = styled.li<{ $mr?: string }>`
  display: flex;
  ${({ $mr }) => $mr && `margin-right: ${$mr}`}
`;

const User = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

function Header() {
  const { user } = useAuth();

  return (
    <StyledHeader>
      <HeaderList>
        {/* Display the user's name and avatar */}
        <HeaderListItem $mr="1.125rem">
          <User to="/account">
            <Avatar src={user?.user_metadata.avatar} />
            <UserName>{user?.user_metadata.displayName}</UserName>
          </User>
        </HeaderListItem>

        {/* Button to toggle between dark and light mode */}
        <HeaderListItem>
          <Button $size="icon" $variant="secondary">
            <HiOutlineMoon />
          </Button>
        </HeaderListItem>

        {/* User logout button */}
        <HeaderListItem>
          <LogoutButton />
        </HeaderListItem>
      </HeaderList>
    </StyledHeader>
  );
}

export default Header;
