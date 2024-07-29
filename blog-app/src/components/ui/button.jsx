import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";


const buttonStyles = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      intent: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-800",
        secondary: "bg-green-500 text-white hover:bg-green-600",
        ghost: "hover:bg-gray-200 hover:text-gray-700",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        small: "h-10 px-4 py-2 rounded-md",
        large: "h-14 px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
  }
);

const CustomButton = React.forwardRef(({ className, intent, size, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonStyles({ intent, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
CustomButton.displayName = "CustomButton";

export { CustomButton, buttonStyles };
