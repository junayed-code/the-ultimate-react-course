import { HTMLAttributes } from "react";
import { cn } from "@utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={cn("w-full max-w-7xl mx-auto py-8 md:py-10", className)}
    >
      {children}
    </div>
  );
}

export default Container;
