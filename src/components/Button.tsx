import { forwardRef } from "react";
import { cn } from "../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary:
        "bg-ink text-paper shadow-soft hover:-translate-y-0.5 hover:bg-night",
      secondary:
        "bg-paper text-ink shadow-insetLine hover:-translate-y-0.5 hover:bg-white",
      ghost: "bg-transparent text-ink hover:bg-ink/5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
