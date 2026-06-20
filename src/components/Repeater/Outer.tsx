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
      'flex w-full border-[0.5px]',
      'pr-5 pl-1 text-center h-5',
      isRounded ? 'rounded-full rounded-shape' : 'rounded-none',
      !isRounded && 'border-l-line-darkest',
      className,
    )}>
    {children}
  </Button>
)
