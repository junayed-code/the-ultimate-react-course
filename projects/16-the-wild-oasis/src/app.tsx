import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Users from '@pages/users';
import Login from '@pages/login';
import Cabins from '@pages/cabins';
import Account from '@pages/account';
import Bookings from '@pages/bookings';
import Settings from '@pages/settings';
import Dashboard from '@pages/dashboard';
import PageNotFound from '@pages/page-not-found';
import AppLayout from '@components/layout/app';
import GlobalStyles from '@/styles/global';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/users', element: <Users /> },
      { path: '/cabins', element: <Cabins /> },
      { path: '/account', element: <Account /> },
      { path: '/bookings', element: <Bookings /> },
      { path: '/settings', element: <Settings /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
