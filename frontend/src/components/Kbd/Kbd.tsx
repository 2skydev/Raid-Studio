import { Fragment } from 'react'

import clsx from 'clsx'

export interface KbdProps {
  className?: string
  useCommandKey?: boolean
  keys?: string[]
}

const Kbd = ({ className, useCommandKey, keys, ...props }: KbdProps) => {
  return (
    <div
      className={clsx(
        'Kbd',
        'font-mono pointer-events-none hidden h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 text-[10px] font-medium sm:flex',
        className,
      )}
      {...props}
    >
      {useCommandKey && <span className="commandKey leading-1 text-xs">⌘</span>}
      {keys?.map((key, index) => (
        <Fragment key={key}>
          <span>{key}</span>
          {index !== keys.length - 1 && <span>+</span>}
        </Fragment>
      ))}
    </div>
  )
}

export default Kbd
