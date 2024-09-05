import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
// Import components
import Home from '@ui/home';
import Error from '@ui/error';
import Cart from '@features/cart';
import AppLayout from '@ui/app-layout';
import ProtectedRoute from '@/features/protected-route';
import Order from '@features/order';
import Menu from '@features/menu';
import CreateOrder from '@features/order/create-order';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/cart', element: <Cart /> },
          { path: '/menu', element: <Menu />, loader: Menu.loader },
          {
            path: '/order/:orderId',
            element: <Order />,
            loader: Order.loader,
            action: Order.action,
          },
          {
            path: '/order/new',
            element: <CreateOrder />,
            action: CreateOrder.action,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
