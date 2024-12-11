import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Users from '@pages/users';
import Login from '@pages/login';
import Cabins from '@pages/cabins';
import Account from '@pages/account';
import Checkin from '@pages/checkin';
import Booking from '@pages/booking';
import Bookings from '@pages/bookings';
import Settings from '@pages/settings';
import Dashboard from '@pages/dashboard';
import ErrorPage from '@pages/error-page';
import ForgotPassword from '@pages/forgot-password';
import UpdatePassword from '@pages/update-password';

import GlobalStyles from '@/styles/global';
import AppLayout from '@components/layout/app';
import Protected from '@features/auth/protected';
import { ThemeProvider } from '@features/theme';

const router = createBrowserRouter([
  {
    element: <Protected protect="authenticated" />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: '/users', element: <Users /> },
          { path: '/cabins', element: <Cabins /> },
          { path: '/account', element: <Account /> },
          { path: '/bookings', element: <Bookings /> },
          { path: '/settings', element: <Settings /> },
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/bookings/:id', element: <Booking /> },
          { path: '/checkin/:id', element: <Checkin /> },
        ],
      },
      { path: '/update-password', element: <UpdatePassword /> },
    ],
  },
  {
    element: <Protected protect="unauthenticated" />,
    errorElement: <ErrorPage />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontWeight: 500,
            fontSize: '.875rem',
            color: 'var(--color-grey-700)',
            backgroundColor: 'var(--color-grey)',
          },
        }}
      />
    </>
  );
}

export default App;
