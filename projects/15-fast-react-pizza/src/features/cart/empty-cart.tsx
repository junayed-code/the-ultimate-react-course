import Link from '@ui/link';

function EmptyCart() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/menu">&larr; Back to menu</Link>
      <p className="mt-6 text-xl font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
