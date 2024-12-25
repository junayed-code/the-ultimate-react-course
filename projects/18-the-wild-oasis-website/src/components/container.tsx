import { HTMLAttributes } from "react";
import { cn } from "@utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

function Container({ children, ...props }: ContainerProps) {
  return (
    <div {...props} className={cn("w-full max-w-7xl mx-auto", props.className)}>
      {children}
    </div>
  );
}

export default Container;
