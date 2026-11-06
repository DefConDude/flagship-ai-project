import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill button, AGENCY style: flat brand fills, no glow.
 * White on #9d4ccd passes AA; turquoise always takes navy text.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,opacity,transform,border-color] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--link)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-purple text-white hover:bg-purple-600",
        accent: "bg-turquoise text-navy hover:opacity-90",
        outline:
          "border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)] hover:bg-surface-muted",
        inverse: "border border-white/25 text-white hover:bg-white/10",
        ghost: "text-[color:var(--text)] hover:bg-surface-muted",
      },
      size: {
        sm: "min-h-9 px-4 text-sm",
        md: "min-h-10 px-5 text-sm",
        lg: "min-h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
