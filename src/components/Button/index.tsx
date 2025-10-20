import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '../../util.js'
import type {MouseListener, VoidAction} from '../types'

interface Props extends VoidAction, StyledProps {
  isActive?: boolean | undefined
  listener?: MouseListener
}

export const Button = ({
  label,
  title: note,
  apply,
  disable,
  isActive = false,
  listener,
  className,
  ...props
}: Props) => {
  const disabled: boolean = disable === undefined ? false : disable[0]
  const title: string = disabled && disable !== undefined ? disable[1] : note
  return (
    <button
      className={twMerge('button', className)}
      {...(isActive && {'data-state': 'active'})}
      {...props}
      {...listener}
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
