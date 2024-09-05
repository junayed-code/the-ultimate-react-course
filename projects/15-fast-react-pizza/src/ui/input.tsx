import React from 'react';
import cn from '@utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// prettier-ignore
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }: InputProps, ref) {
    return (
      <input
        ref={ref}
        autoComplete="off"
        className={cn(
          'flex min-h-9 w-full rounded-md border border-stone-300 bg-transparent px-3 py-1 text-sm outline-none focus-visible:border-stone-400',
          className,
        )}
        {...props}
      />
    )
  }
);

export default Input;
