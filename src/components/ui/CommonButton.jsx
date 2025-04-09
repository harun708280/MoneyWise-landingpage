import { cn } from '@/lib/utils';
import React from 'react';


const CommonButton = ({
  isReversed,
  href,
  target,
  rel,
  className,
  children,
  ariaLabel, 
  ...rest
}) => {
  const buttonClasses = isReversed
    ? 'bg-gradient-to-r from-blue-900 to-blue-500 text-white  hover:bg-white hover:text-blue-500'
    : 'bg-white text-black  hover:bg-[#4338CA] hover:text-white';

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(
          `relative inline-flex items-center justify-between px-6 py-3 overflow-hidden font-medium transition-all rounded-xl group ${buttonClasses}`,
          className,
        )}
        aria-label={ariaLabel} 
      >
        <span
          className={cn(
            'size-full rounded-xl absolute bottom-5 right-6 translate-x-full ease-out duration-500 transition-all translate-y-full group-hover:inset-0 group-hover:translate-y-0 group-hover:translate-x-0',
            isReversed ? 'bg-white' : 'bg-gradient-to-r from-blue-900 to-blue-500',
          )}
        ></span>

        <div
          className={cn(
            'relative flex items-center gap-2 text-left transition-colors duration-300 ease-in-out group-hover:text-white',
            isReversed ? 'text-white group-hover:text-black' : 'text-black',
          )}
        >
          <span className="text-sm font-medium">{children}</span>
        </div>
      </a>
    );
  }

  return (
    <button
      className={cn(
        `group relative inline-flex h-12 items-center justify-center border overflow-hidden rounded-md font-medium transition-all ${buttonClasses} border-transparent`,
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      <div
        className={cn(
          'inline-flex h-12 translate-y-0 items-center justify-center px-6 transition duration-500 group-hover:-translate-y-[150%]',
          isReversed ? 'text-white' : 'text-[#4338CA]',
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'absolute inline-flex h-12 w-full translate-y-[100%] items-center justify-center transition duration-500 group-hover:translate-y-0',
          isReversed ? 'text-[#4338CA]' : 'text-neutral-50',
        )}
      >
        <span
          className={cn(
            'absolute h-[120%] w-[200%] translate-y-full skew-y-12 scale-y-0 transition duration-500 group-hover:translate-y-0 group-hover:scale-150',
            isReversed ? 'bg-white group-hover:text-[#4338CA]' : 'bg-[#4338CA]',
          )}
        ></span>
        <span className="z-10">{children}</span>
      </div>
    </button>
  );
};

export default CommonButton;