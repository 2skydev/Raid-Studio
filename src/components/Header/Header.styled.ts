import { styled } from '@styled-system/jsx'

export const Root = styled('header', {
  base: {
    position: 'sticky',
    top: 0,
    zIndex: 'header',
    w: 'full',
    borderBottom: 'base',
    bga: 'background/80',
    backdropBlur: 'md',
  },
})

export const Wrap = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    h: 'headerHeight',
    pl: '4',
    pr: '5',
  },
})
