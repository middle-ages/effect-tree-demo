import {type BaseProps, type ButtonProps, Button as _Button} from './Button'

export const Button = Object.assign(_Button, {
  Emit: (props: BaseProps) => <_Button {...props} />,
  Focus: (props: Omit<ButtonProps, 'isFocusable'>) => (
    <_Button {...props} isFocusable />
  ),
})
