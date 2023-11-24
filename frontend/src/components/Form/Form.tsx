'use client'

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

import { css, cx } from '@styled-system/css'
import { HTMLStyledProps, styled, Divider } from '@styled-system/jsx'
import {
  formLabel,
  formItem,
  formControl,
  formDescription,
  formMessage,
} from '@styled-system/recipes'

import { Label } from '@/components/Label'

import { UseCustomUseFormReturn } from '@/hooks/useCustomForm'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

export const useFormField = () => {
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

const BaseFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

const BaseFormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} {...props} />
      </FormItemContext.Provider>
    )
  },
)
BaseFormItem.displayName = 'FormItem'

const BaseFormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cx(error && css({ color: 'destructive' }), className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
BaseFormLabel.displayName = 'FormLabel'

const BaseFormControl = React.forwardRef<
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
BaseFormControl.displayName = 'FormControl'

const BaseFormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { formDescriptionId } = useFormField()

  return <p ref={ref} id={formDescriptionId} {...props} />
})
BaseFormDescription.displayName = 'FormDescription'

const BaseFormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p ref={ref} id={formMessageId} {...props}>
      {body}
    </p>
  )
})
BaseFormMessage.displayName = 'FormMessage'

// ==== custom start ====
export interface FormHeaderProps extends HTMLStyledProps<typeof styled.div> {
  title: string
  description?: string
  divider?: boolean
}

export const FormHeader = ({ title, description, divider = true }: FormHeaderProps) => {
  return (
    <div className="FormHeader">
      <h3
        className={css({
          fontSize: 'lg',
          fontWeight: 'medium',
        })}
      >
        {title}
      </h3>

      {description && (
        <p
          className={css({
            fontSize: 'sm',
            color: 'muted.foreground',
          })}
        >
          {description}
        </p>
      )}

      {divider && <Divider my="6" borderColor="border" />}
    </div>
  )
}

export interface BaseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends HTMLStyledProps<typeof styled.form> {
  form: UseCustomUseFormReturn<TFieldValues, TContext>
}

const BaseFormInner = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  { form, children, ...props }: BaseFormProps<TFieldValues, TContext>,
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
  return (
    <FormProvider
      {...omit(form, ['handleSubmit', 'submit'])}
      handleSubmit={form._formProviderHandleSubmit}
    >
      <styled.form ref={ref} spaceY="10" onSubmit={form.handleSubmit} {...props}>
        {children}
      </styled.form>
    </FormProvider>
  )
}

const BaseForm = React.forwardRef(BaseFormInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(
  props: BaseFormProps<TFieldValues, TContext> & { ref?: React.ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof BaseFormInner>

export const Form = BaseForm

export const FormLabel = styled(BaseFormLabel, {
  base: {
    fontSize: 'md',
    fontWeight: 'medium',
  },
})

export const FormDescription = styled(BaseFormDescription, {
  base: {
    fontSize: 'xs',
    color: 'muted.foreground',
  },
})

export const FormMessage = styled(BaseFormMessage, {
  base: {
    fontSize: 'sm',
    color: 'destructive',
  },
})
// ==== custom end ====

export const FormField = BaseFormField
export const FormItem = styled(BaseFormItem, formItem)
export const FormControl = styled(BaseFormControl, formControl)
