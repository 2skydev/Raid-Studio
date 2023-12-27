import clsx from 'clsx'

export interface BackgroundAnimationProps {
  className?: string
}

const BackgroundAnimation = ({ className, ...props }: BackgroundAnimationProps) => {
  return (
    <div
      className={clsx(
        'BackgroundAnimation',
        'fixed top-0 z-0 flex h-screen w-screen justify-around overflow-hidden',
        'after:z-1 after:absolute after:bottom-0 after:left-0 after:h-[20vh] after:w-full after:bg-gradient-to-t after:from-background after:to-[rgba(235,235,235,0.00)]',
        className,
      )}
      {...props}
    >
      <Item className="h-[1em] w-[1em] animate-[backgroundAnimation_9.5s_linear_infinite]" />
      <Item className="h-[1.5em] w-[3em] animate-[backgroundAnimation_17s_linear_infinite_1000ms] blur-[5px]" />
      <Item className="h-[2em] w-[1em] animate-[backgroundAnimation_8s_linear_infinite_1.5s] blur-[0px]" />
      <Item className="h-[1em] w-[1.5em] animate-[backgroundAnimation_13s_linear_infinite_0.5s] blur-[3px]" />
      <Item className="h-[1.25em] w-[2em] animate-[backgroundAnimation_11s_linear_infinite_4s] blur-[2px]" />
      <Item className="h-[2.5em] w-[2em] animate-[backgroundAnimation_9s_linear_infinite_2s] blur-[1px]" />
      <Item className="h-[5em] w-[2em] animate-[backgroundAnimation_12s_linear_infinite_0s] blur-[2.5px]" />
      <Item className="h-[1em] w-[3em] animate-[backgroundAnimation_18s_linear_infinite_5s] blur-[6px]" />
      <Item className="h-[1.5em] w-[2em] animate-[backgroundAnimation_9s_linear_infinite_0s] blur-[0.5px]" />
      <Item className="h-[3em] w-[2.4em] animate-[backgroundAnimation_12s_linear_infinite_6s] blur-[0.5px]" />
    </div>
  )
}

const Item = ({ className, ...props }: BackgroundAnimationProps) => {
  return (
    <div className={clsx('translate-y-full self-end bg-muted-foreground', className)} {...props} />
  )
}

export default BackgroundAnimation
