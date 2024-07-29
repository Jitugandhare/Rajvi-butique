"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";


const UserProfileAvatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-gray-300", className)}
    {...props}
  />
));
UserProfileAvatar.displayName = AvatarPrimitive.Root.displayName;

const UserProfileAvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
UserProfileAvatarImage.displayName = AvatarPrimitive.Image.displayName;

const UserProfileAvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-400 text-white",
      className
    )}
    {...props}
  />
));
UserProfileAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { UserProfileAvatar, UserProfileAvatarImage, UserProfileAvatarFallback };
