import {Array, pipe, type Identified, type StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {type SelectItem} from '../types'

interface Props<Value extends string> extends Identified, StyledProps {
  value: SelectItem
  items: SelectItem[]
  onChange: (value: Value) => void
  title: string
}

export const Select = <Value extends string>({
  value: {id: value},
  items,
  onChange,
  className,
  ...props
}: Props<Value>) => {
  return (
    <select
      {...props}
      {...{value}}
      className={twMerge('contain-strict', className)}
      onChange={e => {
        onChange(e.target.value as Value)
      }}>
      {pipe(
        items,
        Array.map(({id, label, title, icon}) => (
          <option key={id} value={id} {...{title}}>
            {icon !== '' && (
              <>
                {icon}
                &nbsp;&nbsp;&nbsp;
              </>
            )}
            {label}
          </option>
        )),
      )}
    </select>
  )
}
