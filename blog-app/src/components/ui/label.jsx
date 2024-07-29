import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelStyles = cva(
  "text-base font-semibold leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelStyles(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
