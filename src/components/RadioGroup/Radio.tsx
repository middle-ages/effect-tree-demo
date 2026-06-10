import {type Focusable} from '#react/props'
import {
  type ChangeEventHandler,
  useCallback,
  type PropsWithChildren,
} from 'react'
import {RadioInput} from './RadioInput'

interface Props extends PropsWithChildren, Partial<Focusable> {
  name: string
  value: string
  isChecked: boolean
  onChange: (value: string) => void
}

export const Radio = ({onChange, children, ...props}: Props) => (
  <label className='radio'>
    <div>{children}</div>
    <RadioInput
      {...props}
      onChange={useCallback<ChangeEventHandler<HTMLInputElement>>(
        ({target}) => {
          onChange(target.value)
        },
        [onChange],
      )}
    />
  </label>
)
