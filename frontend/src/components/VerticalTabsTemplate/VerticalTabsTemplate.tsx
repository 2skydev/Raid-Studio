import { ComponentProps } from 'react'

import { Tabs } from '@/components/Tabs'

export interface VerticalTabsTemplateProps extends ComponentProps<typeof Tabs> {}

const VerticalTabsTemplate = ({ ...props }: VerticalTabsTemplateProps) => {
  return (
    <Tabs display="flex" alignItems="flex-start" gap="12" {...props}>
      {props.children}
    </Tabs>
  )
}

export default VerticalTabsTemplate
