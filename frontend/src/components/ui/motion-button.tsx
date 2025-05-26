'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Button, type ButtonProps } from './button';

// Extract the button props we want to forward to the inner Button component
type ButtonOnlyProps = Omit<ButtonProps, 'onClick' | 'disabled' | 'className'>;

// Define the motion props we want to support
type MotionButtonProps = ButtonOnlyProps & {
  // Motion props
  whileHover?: HTMLMotionProps<'button'>['whileHover'];
  whileTap?: HTMLMotionProps<'button'>['whileTap'];
  transition?: HTMLMotionProps<'button'>['transition'];
  initial?: HTMLMotionProps<'button'>['initial'];
  animate?: HTMLMotionProps<'button'>['animate'];
  exit?: HTMLMotionProps<'button'>['exit'];
  
  // Additional props
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({
    // Motion props
    whileHover = { scale: 1.03 },
    whileTap = { scale: 0.98 },
    transition = { type: 'spring', stiffness: 400, damping: 17 },
    initial = { scale: 1 },
    animate,
    exit,
    
    // Button props
    className,
    disabled,
    onClick,
    ...buttonProps
  }, ref) => {
    // Extract button-specific props to pass to the inner Button
    const {
      variant,
      size,
      isLoading,
      asChild,
      children,
      ...restButtonProps
    } = buttonProps as ButtonProps;

    return (
      <motion.button
        ref={ref}
        className={className}
        disabled={disabled || isLoading}
        onClick={onClick}
        // Motion props
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transition}
        initial={initial}
        animate={animate}
        exit={exit}
        style={{ display: 'inline-flex' }} // Ensure proper button layout
      >
        <Button
          variant={variant}
          size={size}
          isLoading={isLoading}
          asChild={asChild}
          className="w-full h-full"
          style={{ pointerEvents: 'none' }} // Prevent button from interfering with motion events
          {...restButtonProps}
        >
          {children}
        </Button>
      </motion.button>
    );
  }
);

MotionButton.displayName = 'MotionButton';

export { MotionButton };
