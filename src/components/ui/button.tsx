import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap border text-label transition-all duration-300 ease-[var(--ease-brand)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-foreground",
        secondary:
          "border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        tertiary:
          "border-transparent bg-transparent px-0 text-foreground underline-offset-[6px] hover:underline",
        gold: "border-gold bg-gold text-background hover:bg-transparent hover:text-gold",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-accent",
        icon: "border-transparent bg-transparent text-foreground hover:text-gold",
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-foreground",
        outline:
          "border-border-strong bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        link: "border-transparent bg-transparent px-0 text-foreground underline-offset-4 hover:underline",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-4",
        md: "h-12 px-7",
        lg: "h-14 px-9",
        block: "h-14 w-full px-6",
        icon: "size-11",
        inline: "h-auto p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span>Working</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
