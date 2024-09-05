import { Outlet, useNavigation } from 'react-router-dom';
import Header from '@ui/header';
import Loading from '@ui/loading';
import CartOverview from '@features/cart/cart-overview';
import { useAppSelector } from '@store/hooks';
import { getCartItems } from '@features/cart/cart-slice';
import { getUsername } from '@features/user/user-slice';

function AppLayout() {
  const { state } = useNavigation();
  const cart = useAppSelector(getCartItems);
  const username = useAppSelector(getUsername);

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Loading isLoading={state === 'loading'} />
      <Header />

      <main className="mx-auto w-full max-w-[74rem] px-4 py-8">
        <Outlet />
      </main>

      {!!username && cart.length !== 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
