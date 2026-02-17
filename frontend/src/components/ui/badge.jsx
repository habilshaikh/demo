import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-vault-black",
  {
    variants: {
      variant: {
        default:
          "border-gold/30 bg-gradient-to-r from-gold/15 to-gold/5 text-gold shadow-gold/10 hover:shadow-gold",
        secondary:
          "border-silver/30 bg-gradient-to-r from-silver/15 to-silver/5 text-silver shadow-sm hover:shadow-silver",
        destructive:
          "border-red-500/30 bg-gradient-to-r from-red-500/15 to-red-500/5 text-red-400 shadow-sm hover:shadow-red-500/20",
        outline: 
          "border-gold/20 text-gold bg-transparent hover:bg-gold/10",
        success:
          "border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 text-emerald-400 shadow-sm",
        warning:
          "border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }