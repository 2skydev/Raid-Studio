import { useState } from 'react'

const useDialog = (initialOpen: boolean = false) => {
  const [open, setOpen] = useState(initialOpen)

  const handleOpenChange = (open: boolean) => setOpen(open)

  return { open, setOpen, handleOpenChange }
}

export default useDialog
