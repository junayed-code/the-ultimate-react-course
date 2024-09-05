import { Link } from 'react-router-dom';
import Container from '@ui/container';
import UserProfile from '@features/user/user-profile';
import SearchOrder from '@/features/order/search-order-form';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-yellow-400">
      <Container className="flex items-center border-b p-4 uppercase">
        <div className="w-full md:w-1/2">
          <Link
            to="/"
            className="text-sm font-semibold tracking-widest underline sm:text-base"
          >
            Fast React Pizza Co.
          </Link>
        </div>
        <SearchOrder />
        <UserProfile />
      </Container>
    </header>
  );
}

export default Header;
