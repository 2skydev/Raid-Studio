import { ComponentProps, useState } from 'react'

import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { theme } from '@/styles/theme'

export interface CopyButtonProps extends ComponentProps<typeof Button> {
  value: string
}

let timeoutHandle: NodeJS.Timeout

const CopyButton = ({ value, ...props }: CopyButtonProps) => {
  const [showSuccessIcon, setShowSuccessIcon] = useState(false)

  const handleCopy = () => {
    clearTimeout(timeoutHandle)
    navigator.clipboard.writeText(value)
    setShowSuccessIcon(true)
    timeoutHandle = setTimeout(() => setShowSuccessIcon(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" className="size-8" onClick={handleCopy} {...props}>
      {showSuccessIcon ? (
        <CheckIcon size="1rem" color={theme.colors.green['500']} />
      ) : (
        <CopyIcon size="1rem" />
      )}
    </Button>
  )
}

export default CopyButton
