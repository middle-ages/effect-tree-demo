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
    {...{}}
    isFocusable
    title={`${title} Hold for ½ a second to repeat.`}
    className={twMerge(
      'h-row-smaller flex w-full button border leading-4',
      'text-center *:relative',
      isRounded ? 'rounded-shape rounded-full pl-2' : 'rounded-none',
      !isRounded && 'border-l-line-darkest',
      className,
    )}>
    <div className="place-self-center-safe w-[100%-15px]">{children}</div>
    <div className="relative ml-px w-[15px] h-full" />
  </Button>
)
