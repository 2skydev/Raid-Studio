import Content from './Content'
import _SelectMultiple from './SelectMultiple'
import Value from './Value'

type _SelectMultiple = typeof _SelectMultiple

interface SelectMultipleType extends _SelectMultiple {
  Content: typeof Content
  Value: typeof Value
}

const SelectMultiple = _SelectMultiple as SelectMultipleType

SelectMultiple.Content = Content
SelectMultiple.Value = Value

export default SelectMultiple
