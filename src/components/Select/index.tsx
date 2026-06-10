import * as Array from '#Array'
import {pipe} from '#Function'
import {type Identified, type StyledProps} from '#react/props'
import {type SelectItem} from '../types'

interface Props<Value extends string> extends Identified, StyledProps {
  value: SelectItem
  items: SelectItem[]
  onChange: (value: Value) => void
  title: string
  isFocusable?: boolean
}

export const Select = <Value extends string>({
  id: name,
  value: {id: value},
  items,
  isFocusable = true,
  onChange,
  ...props
}: Props<Value>) => {
  return (
    <select
      {...{...props, value, name}}
      {...(isFocusable ? {} : {tabIndex: -1})}
      onChange={e => {
        onChange(e.target.value as Value)
      }}>
      {pipe(
        items,
        Array.map(({id, label, title, icon}) => (
          <option key={id} value={id} {...{title}}>
            {icon !== '' && <>{icon}</>} {label}
          </option>
        )),
      )}
    </select>
  )
}
