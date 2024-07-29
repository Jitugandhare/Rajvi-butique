import * as React from "react";
import { cn } from "@/lib/utils";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { buttonVariants } from "@/components/ui/button";

const CustomAlertDialog = AlertDialogPrimitive.Root;

const CustomAlertDialogTrigger = AlertDialogPrimitive.Trigger;

const CustomAlertDialogPortal = AlertDialogPrimitive.Portal;

const CustomAlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
CustomAlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const CustomAlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <CustomAlertDialogPortal>
    <CustomAlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 gap-4 border border-gray-400 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 sm:rounded-lg",
        className
      )}
      {...props}
    />
  </CustomAlertDialogPortal>
));
CustomAlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const CustomAlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left text-gray-900", className)}
    {...props}
  />
);
CustomAlertDialogHeader.displayName = "CustomAlertDialogHeader";

const CustomAlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
CustomAlertDialogFooter.displayName = "CustomAlertDialogFooter";

const CustomAlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-gray-900", className)} {...props} />
));
CustomAlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const CustomAlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-700", className)}
    {...props}
  />
));
CustomAlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const CustomAlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), "bg-blue-500 text-white hover:bg-blue-600", className)}
    {...props}
  />
));
CustomAlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const CustomAlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0 border-gray-300 text-gray-700 hover:bg-gray-200", className)}
    {...props}
  />
));
CustomAlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  CustomAlertDialog,
  CustomAlertDialogPortal,
  CustomAlertDialogOverlay,
  CustomAlertDialogTrigger,
  CustomAlertDialogContent,
  CustomAlertDialogHeader,
  CustomAlertDialogFooter,
  CustomAlertDialogTitle,
  CustomAlertDialogDescription,
  CustomAlertDialogAction,
  CustomAlertDialogCancel,
};
