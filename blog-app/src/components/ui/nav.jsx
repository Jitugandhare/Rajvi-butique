import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const triggerStyles = cva(
  "group inline-flex h-12 w-max items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-semibold transition-colors hover:bg-primary-dark hover:text-white focus:bg-primary-dark focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-40 data-[active]:bg-primary-dark/70 data-[state=open]:bg-primary-dark/70"
);

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-20 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;


const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-1 list-none items-center justify-center space-x-2",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;


const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(triggerStyles(), className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-[1px] ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute left-0 top-full w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-64 data-[motion=from-start]:slide-in-from-left-64 data-[motion=to-end]:slide-out-to-right-64 data-[motion=to-start]:slide-out-to-left-64 md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;


const NavigationMenuLink = NavigationMenuPrimitive.Link;


const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-border bg-background text-background-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-10 flex h-2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div
      className="relative top-[50%] h-3 w-3 rotate-45 rounded-lg bg-border shadow-lg"
    />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  triggerStyles,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
