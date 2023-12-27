import { ComponentProps } from 'react'

import { Tabs } from '@/components/ui/tabs'

export interface VerticalTabsTemplateProps extends ComponentProps<typeof Tabs> {}

const VerticalTabsTemplate = ({ ...props }: VerticalTabsTemplateProps) => {
  return (
    <Tabs className="flex items-start gap-12" {...props}>
      {props.children}
    </Tabs>
  )
}

export default VerticalTabsTemplate
