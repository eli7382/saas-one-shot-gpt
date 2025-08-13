import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/styles/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref as any} className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 border hover:bg-muted focus-visible:outline focus-visible:outline-2", className)} {...props} />;
});
Button.displayName = "Button";
export default Button; 