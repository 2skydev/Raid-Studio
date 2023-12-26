import * as React from 'react'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { omit } from 'lodash'

import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { UseCustomUseFormReturn } from '@/hooks/useCustomForm'
import { cn } from '@/utils'

export interface BaseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends React.HTMLAttributes<HTMLFormElement> {
  form: UseCustomUseFormReturn<TFieldValues, TContext>
}

const BaseFormInner = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  { form, children, className, ...props }: BaseFormProps<TFieldValues, TContext>,
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
  return (
    <FormProvider
      {...omit(form, ['handleSubmit', 'submit'])}
      handleSubmit={form._formProviderHandleSubmit}
    >
      <form
        ref={ref}
        className={cn('space-y-10', className)}
        onSubmit={form.handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  )
}

const BaseForm = React.forwardRef(BaseFormInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(
  props: BaseFormProps<TFieldValues, TContext> & { ref?: React.ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof BaseFormInner>

const Form = BaseForm

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  { asChild?: boolean } & React.HTMLAttributes<HTMLParagraphElement>
>(({ className, asChild, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  const Comp = asChild ? Slot : 'p'

  return (
    <Comp
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export const FormHeader = ({ title, description, ...props }: FormHeaderProps) => {
  return (
    <div className="FormHeader" {...props}>
      <h3 className="text-lg font-medium">{title}</h3>

      {description && <p className="text-sm text-muted-foreground">{description}</p>}

      <Separator className="my-6" />
    </div>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
