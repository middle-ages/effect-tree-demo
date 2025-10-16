import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '../../util.js'
import type {VoidAction} from '../types'

interface Props extends VoidAction, StyledProps {}

export const Button = ({
  label,
  title: note,
  apply,
  disable,
  className,
  ...props
}: Props) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button
      className={twMerge('button', className)}
      {...props}
      {...{title, disabled}}
      onClick={() => {
        if (!disabled) {
          apply()
        }
      }}>
      {label}
    </button>
  )
}
