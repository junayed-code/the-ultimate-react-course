import type React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '@utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold select-none uppercase tracking-wider sm:text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-400 text-yellow-900',
        secondary: 'bg-green-500 text-green-50',
        destructive: 'bg-red-500 text-red-50',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export default Badge;
