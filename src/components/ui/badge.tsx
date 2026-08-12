import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border px-2.5 py-1 text-label transition-colors",
  {
    variants: {
      variant: {
        default: "border-border-strong bg-background/70 text-foreground backdrop-blur",
        gold: "border-gold/50 bg-background/70 text-gold backdrop-blur",
        solid: "border-transparent bg-primary text-primary-foreground",
        outline: "border-border-strong bg-transparent text-muted-foreground",
        sale: "border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
