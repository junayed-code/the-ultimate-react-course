import type { HTMLAttributes } from "react";

import Logo from "@ui/logo";
import Navigation from "@components/navigation";
import { cn } from "@utils/cn";

type HeaderProps = HTMLAttributes<HTMLElement>;

function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={cn(
        "border-b border-primary-900 px-5 md:px-8 py-4 h-[4.25rem]",
        className,
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
