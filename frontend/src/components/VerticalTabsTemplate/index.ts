import Content from './Content'
import List from './List'
import Trigger from './Trigger'
import _VerticalTabsTemplate from './VerticalTabsTemplate'

type _VerticalTabsTemplate = typeof _VerticalTabsTemplate

interface VerticalTabsTemplateType extends _VerticalTabsTemplate {
  Content: typeof Content
  List: typeof List
  Trigger: typeof Trigger
}

const VerticalTabsTemplate = _VerticalTabsTemplate as VerticalTabsTemplateType

VerticalTabsTemplate.Content = Content
VerticalTabsTemplate.List = List
VerticalTabsTemplate.Trigger = Trigger

export default VerticalTabsTemplate
