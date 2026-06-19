import type {DisabledItemProps} from '#types'
import {useRepeatButton} from '#usePointerButton'
import type {Types} from 'effect'
import {type RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

interface _BaseProps extends Omit<DisabledItemProps, 'isDisabled'> {
  ref?: RefCallback<HTMLButtonElement>
  isFocusable?: boolean

  /** Control button active pseudo state externally. */
  isActive?: boolean | undefined

  isDisabled?: boolean | undefined

  /** If true wraps children in a div. */
  isWrapped?: boolean
}

interface _ButtonProps extends _BaseProps {
  onClick?: () => void
}

type BaseProps = Types.Simplify<_BaseProps>
type ButtonProps = Types.Simplify<_ButtonProps>

const _Button = ({
  id,
  ref,
  title: propsTitle,
  isDisabled = false,
  disabledNote = '',
  isActive = false,
  isFocusable = true,
  isWrapped = false,
  className,
  style,
  onClick,
  children,
}: ButtonProps) => {
  const title = isDisabled ? disabledNote : propsTitle

  return (
    <button
      className={twMerge(
        'button',
        isFocusable ? 'focusable' : 'focus-none',
        className,
      )}
      disabled={isDisabled}
      {...(!isFocusable && {tabIndex: -1})}
      {...(isActive && {'data-state': 'active'})}
      {...{id, ref, title, style, onClick}}>
      {isWrapped ? <div>{children}</div> : children}
    </button>
  )
}

const Repeat = ({onClick, ...props}: Omit<ButtonProps, 'ref'>) => {
  const [, ref] = useRepeatButton(onClick)
  return <_Button {...{ref}} {...props} />
}

const Emit = (props: BaseProps) => <_Button {...props} />

const Focus = (props: Omit<ButtonProps, 'isFocusable'>) => (
  <_Button {...props} isFocusable />
)

export const Button = Object.assign(_Button, {
  Repeat,
  Emit,
  Focus,
})
