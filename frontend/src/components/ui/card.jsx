import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border text-card-foreground shadow-card-luxury transition-all duration-300",
      variant === "default" && "bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-gold/10 backdrop-blur-xl hover:border-gold/20 hover:shadow-gold",
      variant === "gold" && "bg-gradient-to-br from-gold/5 to-gold/[0.02] border-gold/20 backdrop-blur-xl hover:border-gold/40 hover:shadow-gold-lg",
      variant === "silver" && "bg-gradient-to-br from-silver/5 to-silver/[0.02] border-silver/20 backdrop-blur-xl hover:border-silver/40 hover:shadow-silver",
      variant === "solid" && "bg-vault-charcoal border-gold/10",
      className
    )}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 relative", className)}
    {...props}>
    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    {props.children}
  </div>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-heading font-semibold leading-none tracking-tight text-white", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-silver/70", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 relative", className)}>
    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    {props.children}
  </div>
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }