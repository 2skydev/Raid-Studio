import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface SelectMultipleContextValue {
  setOpen: Dispatch<SetStateAction<boolean>>
  selectedValues: string[]
}

export const SelectMultipleContext = createContext<SelectMultipleContextValue | null>(null)

const useSelectMultiple = () => {
  const context = useContext(SelectMultipleContext)!
  return context
}

export default useSelectMultiple
