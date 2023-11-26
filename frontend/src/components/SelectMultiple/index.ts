import Content from './Content'
import Item from './Item'
import _SelectMultiple from './SelectMultiple'
import Trigger from './Trigger'
import Value from './Value'

type _SelectMultiple = typeof _SelectMultiple

interface SelectMultipleType extends _SelectMultiple {
  Content: typeof Content
  Item: typeof Item
  Trigger: typeof Trigger
  Value: typeof Value
}

const SelectMultiple = _SelectMultiple as SelectMultipleType

SelectMultiple.Content = Content
SelectMultiple.Item = Item
SelectMultiple.Trigger = Trigger
SelectMultiple.Value = Value

export default SelectMultiple
