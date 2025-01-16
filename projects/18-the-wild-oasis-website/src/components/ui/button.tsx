import { cloneElement, isValidElement, type ButtonHTMLAttributes } from "react";
import { cn } from "@utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

function Button({ asChild, children, ...props }: ButtonProps) {
  const className = cn(
    `bg-accent-500 text-primary-800 hover:bg-accent-600 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm whitespace-nowrap transition-all md:text-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300`,
    props.className,
  );

  const element =
    asChild && isValidElement<ButtonProps>(children) ? (
      cloneElement(children, { ...props, className })
    ) : (
      <button {...props} className={className}>
        {children}
      </button>
    );

  return element;
}

export default Button;
