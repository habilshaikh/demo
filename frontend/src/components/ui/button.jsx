import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-vault-black disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-vault-black shadow-gold hover:shadow-gold-lg hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-sm hover:shadow-lg hover:shadow-red-500/20",
        outline:
          "border border-gold/30 bg-transparent text-gold shadow-sm hover:bg-gold/10 hover:border-gold/50 hover:shadow-gold",
        secondary:
          "bg-gradient-to-r from-silver-dark via-silver to-silver-light text-vault-black shadow-sm hover:shadow-silver hover:scale-[1.02]",
        ghost: "text-silver hover:bg-white/5 hover:text-gold",
        link: "text-gold underline-offset-4 hover:underline hover:text-gold-light",
        luxury:
          "relative overflow-hidden bg-gradient-to-r from-gold-dark via-gold to-gold-light text-vault-black font-bold shadow-gold-glow hover:shadow-gold-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500",
        luxuryOutline:
          "border-2 border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:border-gold shadow-gold hover:shadow-gold-lg",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }