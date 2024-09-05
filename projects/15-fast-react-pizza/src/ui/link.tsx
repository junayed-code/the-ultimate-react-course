import {
  Link as ReactRouterLink,
  type LinkProps as ReactRouterLinkProps,
} from 'react-router-dom';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from '@utils/cn';

type LinkProps = ReactRouterLinkProps & {
  asChild?: boolean;
};

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  // prettier-ignore
  function Link({ className, asChild, ...props }: LinkProps, ref) {
    const Comp = asChild ? Slot : ReactRouterLink;

    return (
      <Comp
        className={cn(
          'inline-flex gap-2 text-blue-500 hover:text-blue-600 hover:underline',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
},
);

export default Link;
