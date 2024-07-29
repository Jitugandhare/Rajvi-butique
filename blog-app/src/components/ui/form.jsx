"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// Aliases and Contexts
const FormContext = FormProvider;

const FieldContext = React.createContext({});

const FormField = ({ ...props }) => {
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FieldContext.Provider>
  );
};

const useField = () => {
  const fieldContext = React.useContext(FieldContext);
  const itemContext = React.useContext(ItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-item`,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-message`,
    ...fieldState,
  };
};

const ItemContext = React.createContext({});

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const uniqueId = React.useId();

  return (
    <ItemContext.Provider value={{ id: uniqueId }}>
      <div ref={ref} className={cn("space-y-3", className)} {...props} />
    </ItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useField();

  return (
    <Label
      ref={ref}
      className={cn(error ? "text-error" : "text-primary", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useField();
  const messageContent = error ? String(error.message) : children;

  if (!messageContent) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-error", className)}
      {...props}
    >
      {messageContent}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useField as useFormField,
  FormContext as Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
