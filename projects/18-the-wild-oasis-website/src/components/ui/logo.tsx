import Link from "next/link";
import Image from "next/image";
import logoImage from "@images/logo.png";

function Logo({ size = "36" }: Readonly<{ size?: `${number}` }>) {
  return (
    <Link href="/" className="flex items-end gap-2.5 z-10">
      <Image
        src={logoImage}
        height={size}
        width={size}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100 whitespace-nowrap">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
