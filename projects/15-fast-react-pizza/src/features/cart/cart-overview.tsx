import { Link } from 'react-router-dom';
import Container from '@ui/container';
import { useAppSelector } from '@store/hooks';
import { getTotalPriceAndPizza } from '@features/cart/cart-slice';

function CartOverview() {
  const { totalPrice, totalPizza } = useAppSelector(getTotalPriceAndPizza);

  return (
    <footer className="sticky bottom-0 bg-stone-800 text-stone-200">
      <Container className="flex items-center justify-between p-4 text-sm uppercase sm:text-base">
        <p className="space-x-2.5 font-semibold sm:space-x-4">
          <span>{(totalPizza + '').padStart(2, '0')} pizzas</span>
          <span>${totalPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </Container>
    </footer>
  );
}

export default CartOverview;
