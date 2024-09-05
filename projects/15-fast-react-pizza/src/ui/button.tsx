import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import cn from '@utils/cn';

const buttonVariant = cva(
  'inline-flex items-center whitespace-nowrap justify-center gap-2 rounded-md font-medium uppercase transition-all duration-300 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        default: 'bg-yellow-400 text-stone-800 enabled:hover:bg-yellow-500',
        destructive: 'bg-red-500 text-stone-100 enabled:hover:bg-red-600',
        link: 'text-blue-500 enabled:hover:text-blue-600 enabled:hover:underline',
        outline:
          'border border-stone-700 text-stone-700 enabled:hover:bg-stone-700 enabled:hover:text-stone-100',
      },
      size: {
        default: 'px-3 py-2 text-sm',
        sm: 'px-2.5 py-1.5 text-xs',
        lg: 'px-7 py-2.5 text-base',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariant> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, asChild, variant, size, ...props }: ButtonProps,
  ref,
) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariant({ variant, size, className }), '')}
      ref={ref}
      {...props}
    />
  );
});

export default Button;
