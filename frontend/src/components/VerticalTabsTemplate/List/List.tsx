import { styled } from '@styled-system/jsx'

import { TabsList } from '@/components/Tabs'

const List = styled(TabsList, {
  base: {
    display: 'flex',
    flexDir: 'column',
    spaceY: '1',
    h: 'auto',
    bg: 'none',
    p: '0',
    mx: '-4',
  },
})

export default List
