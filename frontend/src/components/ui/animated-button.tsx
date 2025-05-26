'use client';

import * as React from 'react';
import { MotionButton } from './motion-button';

type AnimatedButtonProps = React.ComponentProps<typeof MotionButton>;

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({
    whileHover = { scale: 1.03 },
    whileTap = { scale: 0.98 },
    transition = { type: 'spring', stiffness: 400, damping: 17 },
    ...props
  }, ref) => {
    return (
      <MotionButton
        ref={ref}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transition}
        {...props}
      />
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };
