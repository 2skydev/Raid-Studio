import { styled } from '@styled-system/jsx'

import { ScrollArea } from '@/components/ScrollArea'
import Sidebar from '@/components/Sidebar'

const StudioLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <styled.div px="4">
      <styled.aside w="280px" h="mainHeight" pos="fixed">
        <ScrollArea
          h="full"
          pr="2.5"
          py="6"
          lg={{
            py: '8',
          }}
        >
          <Sidebar />
        </ScrollArea>
      </styled.aside>

      <styled.main
        ml="calc(280px + token(sizes.10))"
        flex="1"
        py="6"
        pr="8"
        lg={{
          py: '8',
        }}
      >
        {children}
      </styled.main>
    </styled.div>
  )
}

export default StudioLayout
