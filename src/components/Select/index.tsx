'use client'

import {Array, pipe, type Identified} from '#util'
import {type SelectItem} from '../types'

interface Props<Value extends string> extends Identified {
  value: SelectItem
  items: SelectItem[]
  onChange: (value: Value) => void
}

export const Select = <Value extends string>({
  id,
  value: {id: value},
  items,
  onChange,
}: Props<Value>) => (
  <select
    {...{id, value}}
    onChange={e => {
      onChange(e.target.value as Value)
    }}>
    {pipe(
      items,
      Array.map(({id, label, title, icon}) => (
        <option key={id} value={id} {...{title}}>
          {icon}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {label}
        </option>
      )),
    )}
  </select>
)
