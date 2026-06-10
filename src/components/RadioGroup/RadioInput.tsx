import {type Focusable} from '#react/props'
import {type ChangeEventHandler} from 'react'

interface Props extends Partial<Focusable> {
  name: string
  value: string
  isChecked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const RadioInput = ({
  name,
  isChecked: checked,
  isFocusable,
  ...props
}: Props) => (
  <div className='radio-input'>
    <input
      type='radio'
      {...{...props, name, checked}}
      {...(isFocusable ? {} : {tabIndex: -1})}
      {...(isFocusable ? {} : {className: 'focus-none'})}
    />
    <div className='radio-dot'>
      <span></span>
    </div>
  </div>
)
