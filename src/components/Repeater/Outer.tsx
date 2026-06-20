import {Button} from '#Button'
import type {StyledPropsWithChildren} from '#util'
import type {RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import type {DisabledProps} from '../types.js'

interface Props extends StyledPropsWithChildren, DisabledProps {
  id: string
  ref: RefCallback<HTMLElement>
  title: string
  isActive: boolean
  isRounded?: boolean
  onClick: () => void
}

export const Outer = ({
  title,
  className,
  isRounded = false,
  children,
  ...props
}: Props) => (
  <Button
    {...props}
    isFocusable
    title={`${title} Hold for ½ a second to repeat.`}
    className={twMerge(
      'border',
      'pr-5 pl-1 text-center',
      isRounded ? 'rounded-full rounded-shape' : 'rounded-none',
      className,
    )}>
    {children}
  </Button>
)
