
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md hover:shadow-lg active:shadow-sm ripple-effect',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-neon-sm hover:shadow-neon-md',
				destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-md hover:shadow-lg border border-destructive/50',
				outline:
          'border border-primary/70 bg-transparent hover:bg-primary/10 hover:text-primary active:bg-primary/20 text-primary shadow-none',
				secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80 shadow-neon-sm hover:shadow-neon-md',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80 shadow-neon-sm hover:shadow-neon-md',
				ghost: 'hover:bg-primary/10 hover:text-primary active:bg-primary/20 shadow-none',
				link: 'text-primary underline-offset-4 hover:underline shadow-none',
			},
			size: {
				default: 'h-11 px-5 py-2.5', 
				sm: 'h-10 rounded-md px-4', 
				lg: 'h-12 rounded-xl px-8 text-base',
				icon: 'h-11 w-11',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, children, onClick, ...props }, ref) => {
	const Comp = asChild ? Slot : motion.button;

  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  const handleClick = (event) => {
    createRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

	return (
		<Comp
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
      onClick={handleClick}
			{...props}
		>
      {children}
    </Comp>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };
