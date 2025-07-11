
import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center group py-2',
      className
    )}
    {...props}>
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-primary/20 shadow-inner-neon">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary to-secondary group-hover:shadow-neon-sm transition-all duration-300" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-6 w-6 rounded-full border-2 border-primary bg-background ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md group-hover:scale-110 group-hover:shadow-neon-md cursor-pointer" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
