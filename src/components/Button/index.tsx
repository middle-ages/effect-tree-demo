import type {DisabledItem} from '#types'
import {useRepeatButton} from '#usePointerButton'
import {type StyledPropsWithChildren} from '#util'
import type {Types} from 'effect'
import {type RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'

interface _BaseProps
  extends Omit<DisabledItem, 'label'>,
    StyledPropsWithChildren {
  /** Control button active state externally. */
  isActive?: boolean | undefined
  ref?: RefCallback<HTMLButtonElement>
  isFocusable?: boolean
}

interface _ButtonProps extends _BaseProps {
  onClick?: () => void
}

type BaseProps = Types.Simplify<_BaseProps>
type ButtonProps = Types.Simplify<_ButtonProps>

export const Button = ({
  id,
  ref,
  title: propsTitle,
  isDisabled,
  disabledNote = '',
  isActive = false,
  isFocusable = true,
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
        isFocusable ? 'focusable' : 'outline-none ring-offset-transparent',
        className,
      )}
      disabled={isDisabled}
      {...(!isFocusable && {tabIndex: -1})}
      {...(isActive && {'data-state': 'active'})}
      {...{id, ref, title, style, onClick}}>
      {children}
    </button>
  )
}

const RepeatButton = ({onClick, ...props}: Omit<ButtonProps, 'ref'>) => {
  const [, ref] = useRepeatButton(onClick)
  return <Button {...{ref}} {...props} />
}

const EmitButton = (props: BaseProps) => <Button {...props} />

const Focus = (props: Omit<ButtonProps, 'isFocusable'>) => (
  <Button {...props} isFocusable />
)

Button.Repeat = RepeatButton
Button.Emit = EmitButton
Button.Focus = Focus
