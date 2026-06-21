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
  onClick: () => void
}

export const Outer = ({title, className, children, ...props}: Props) => (
  <Button
    {...props}
    isFocusable
    title={`${title} Hold for ½ a second to repeat.`}
    className={twMerge(
      'max-h-6 min-h-6 w-full',
      'pr-2.75 text-center',
      className,
    )}>
    {children}
  </Button>
)
