import * as React from "react";
import { cn } from "@/lib/utils";

const TextInput = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-input-border bg-input-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextInput.displayName = "TextInput";

export { TextInput };
