import { styled } from '@styled-system/jsx'

export const Root = styled('kbd', {
  base: {
    pointerEvents: 'none',
    display: 'none',
    h: '5',
    userSelect: 'none',
    alignItems: 'center',
    gap: '1',
    rounded: 'sm',
    border: 'base',
    bg: 'muted',
    px: '1.5',
    fontFamily: 'mono',
    fontSize: '10px',
    fontWeight: 'medium',
    opacity: '1',
    sm: {
      display: 'flex',
    },
    '& > .commandKey': {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
  },
  variants: {
    test: {
      true: {
        display: 'flex',
      },
    },
  },
})
