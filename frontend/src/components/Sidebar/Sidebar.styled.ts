import Link from 'next/link'

import { styled } from '@styled-system/jsx'

import { AccordionTrigger } from '@/components/Accordion'

export const MenuItemsGroup = styled('ul', {
  base: {
    mt: '2',
    pl: '2',
    ml: '4',
    borderLeft: 'base',
    spaceY: '1',
  },
})

export const MenuAccordionTrigger = styled(AccordionTrigger, {
  base: {
    textStyle: 'sm',
    fontWeight: 'medium',
    cursor: 'pointer',
    py: '2',
    px: '3',
    rounded: 'md',
    _hover: { textDecoration: 'none', bg: 'muted' },

    '& > svg': {
      transform: 'rotate(-90deg)',
    },

    '&[data-state=open] > svg': {
      transform: 'rotate(0deg)',
    },
  },
})

export const MenuLink = styled(Link, {
  base: {
    display: 'flex',
    w: 'full',
    textStyle: 'sm',
    fontWeight: 'medium',
    py: '2',
    px: '3',
    rounded: 'md',
    cursor: 'pointer',
    bg: 'transparent',
    _hover: { bg: 'muted' },
  },
  variants: {
    active: {
      true: {
        bg: 'muted',
      },
    },
  },
})
