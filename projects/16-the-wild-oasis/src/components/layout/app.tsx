import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Logo from '@ui/logo';
import Header from '@components/header';
import Navbar from '@components/navbar';
import Uploader from '@components/uploader';

const Sidebar = styled.aside`
  height: 100dvh;
  overflow-y: auto;
  grid-row: 1 / -1;
  padding: 0.875rem 0.625rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  position: sticky;
  top: 0;
  border-right: var(--border);
  background-color: var(--color-grey-50);

  &::-webkit-scrollbar {
    width: 0.375rem;
    &-track {
      background-color: transparent;
    }
    &-thumb {
      background-color: var(--color-grey-200);
      border-radius: var(--border-radius-md);
    }
  }
`;

const Main = styled.main`
  padding: 0 var(--padding);
  overflow-x: auto;
`;

const LayoutRoot = styled.div`
  --padding: 1.25rem;
  --sidebar-width: 16.5rem;
  --border: 1px solid var(--color-grey-200);

  display: grid;
  min-height: 100dvh;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: 4rem 1fr;
`;

function AppLayout() {
  return (
    <LayoutRoot>
      <Sidebar>
        <Logo />
        <Navbar />
        <Uploader />
      </Sidebar>

      <Header />

      <Main>
        <Outlet />
      </Main>
    </LayoutRoot>
  );
}

export default AppLayout;
