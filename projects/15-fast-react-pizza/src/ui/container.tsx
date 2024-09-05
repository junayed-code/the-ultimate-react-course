import type React from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from '@utils/cn';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

function Container({ className, asChild, ...props }: ContainerProps) {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={cn('mx-auto max-w-7xl', className)} {...props} />;
}

export default Container;
