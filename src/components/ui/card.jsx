
import { cn } from '@/lib/utils';
import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { delay: i * 0.07, type: "spring", stiffness: 260, damping: 20 } 
  }),
  hover: { 
    y: -5, 
    boxShadow: "0 10px 20px hsl(var(--primary)/0.2), 0 0 15px hsl(var(--primary)/0.3)",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const Card = React.forwardRef(({ className, children, customIndex = 0, enableHoverAnimation = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    custom={customIndex}
    variants={cardVariants}
    initial="initial"
    animate="animate"
    whileHover={enableHoverAnimation ? "hover" : ""}
    className={cn(
      'rounded-xl border border-border/40 bg-card/60 text-card-foreground shadow-lg glass-effect-dark overflow-hidden',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight font-heading',
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
