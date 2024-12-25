import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-lg hidden md:block">
      <ul className="flex gap-10 items-center tracking-wide">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest Area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
