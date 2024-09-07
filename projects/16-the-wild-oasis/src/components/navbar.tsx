import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineCalendarDays,
} from 'react-icons/hi2';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Link = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 0.625rem;

    color: var(--color-grey-600);
    font-weight: 500;
    padding: 0.625rem 1.25rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function Navbar() {
  return (
    <nav>
      <NavList>
        <li>
          <Link to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </Link>
        </li>
        <li>
          <Link to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </Link>
        </li>
      </NavList>
    </nav>
  );
}

export default Navbar;
