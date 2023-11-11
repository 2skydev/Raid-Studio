import { FieldValues, UseFormProps, UseFormReturn, useForm } from 'react-hook-form'

import deepEqual from 'fast-deep-equal'

import useDidUpdateEffect from './useDidUpdateEffect'

export interface UseCustomUseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> extends UseFormProps<TFieldValues, TContext> {
  onSubmit?: (data: TFieldValues) => void
  syncDefaultValues?: boolean
}

export interface UseCustomUseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> extends Omit<UseFormReturn<TFieldValues, TContext>, 'handleSubmit'> {
  /**
   * `react-hook-form`의 `handleSubmit`을 덮어쓴 함수입니다.
   *
   * @example
   * ```tsx
   * <form onSubmit={form.handleSubmit}>
   * ```
   */
  handleSubmit: (e?: React.BaseSyntheticEvent) => void

  /**
   * 직접 `onSubmit`을 호출하는 함수입니다.
   */
  submit: () => Promise<boolean>

  /**
   * @internal
   *
   * `useCustomForm`은 `react-hook-form`의 `handleSubmit`을 덮어쓰기 때문에 `<FormProvider />` 타입 호환이 안됩니다.
   *
   * 이를 해결하기 위해 원래의 `handleSubmit`을 노출시켜서 `<FormProvider />`에서 사용할 수 있도록 합니다.
   */
  _formProviderHandleSubmit: UseFormReturn<TFieldValues, TContext>['handleSubmit']
}

const useCustomForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: UseCustomUseFormProps<TFieldValues, TContext>,
): UseCustomUseFormReturn<TFieldValues, TContext> => {
  const { onSubmit = () => {}, syncDefaultValues = false, ...rest } = props

  const form = useForm(rest)

  const handleDefaultValuesChange = async () => {
    if (syncDefaultValues) {
      const defaultValues =
        rest.defaultValues instanceof Function ? await rest.defaultValues() : rest.defaultValues

      if (!deepEqual(rest.defaultValues, form.getValues())) {
        form.reset(defaultValues)
      }
    }
  }

  useDidUpdateEffect(() => {
    handleDefaultValuesChange()
  }, [rest.defaultValues])

  return {
    ...form,
    handleSubmit: e => {
      form.handleSubmit(onSubmit)(e)
    },
    _formProviderHandleSubmit: form.handleSubmit,
    submit: async () => {
      if (await form.trigger()) {
        await onSubmit(form.getValues())
        return true
      }

      return false
    },
  }
}

export default useCustomForm
