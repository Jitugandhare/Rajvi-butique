import * as React from "react";
import { cn } from "@/lib/utils";
const CustomCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border border-gray-300 bg-white text-gray-800 shadow-lg", className)}
    {...props}
  />
));
CustomCard.displayName = "CustomCard";


const CustomCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-3 p-5 bg-gray-50 rounded-t-xl border-b border-gray-300", className)}
    {...props}
  />
));
CustomCardHeader.displayName = "CustomCardHeader";


const CustomCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold text-gray-900", className)}
    {...props}
  />
));
CustomCardTitle.displayName = "CustomCardTitle";


const CustomCardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
CustomCardDescription.displayName = "CustomCardDescription";


const CustomCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-5", className)}
    {...props}
  />
));
CustomCardContent.displayName = "CustomCardContent";


const CustomCardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-end p-5 border-t border-gray-300", className)}
    {...props}
  />
));
CustomCardFooter.displayName = "CustomCardFooter";

export { CustomCard, CustomCardHeader, CustomCardFooter, CustomCardTitle, CustomCardDescription, CustomCardContent };
