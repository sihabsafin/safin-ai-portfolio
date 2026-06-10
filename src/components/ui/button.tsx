import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white text-background hover:bg-white/90 shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/10 bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-white/20 backdrop-blur",
        secondary:
          "bg-white/[0.06] text-foreground hover:bg-white/[0.1] border border-white/10",
        ghost: "hover:bg-white/[0.05] text-foreground/80 hover:text-foreground",
        link: "text-secondary underline-offset-4 hover:underline",
        hero:
          "text-white bg-[linear-gradient(135deg,#38BDF8_0%,#4F46E5_100%)] shadow-[0_10px_40px_-10px_rgba(79,70,229,0.6)] hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.7)] hover:-translate-y-0.5",
        "hero-outline":
          "border border-white/12 bg-white/[0.03] text-foreground hover:bg-white/[0.07] hover:border-white/25 backdrop-blur-xl",
        glass:
          "bg-white/[0.04] backdrop-blur-xl border border-white/10 text-foreground hover:bg-white/[0.08] hover:border-white/20",
        accent:
          "text-white bg-[linear-gradient(135deg,#38BDF8_0%,#4F46E5_100%)] hover:opacity-90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-sm",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
