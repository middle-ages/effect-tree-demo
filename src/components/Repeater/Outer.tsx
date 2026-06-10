import {Button} from '#Button'
import type {StyledPropsWithChildren} from '#react/props'
import type {ReactNode, RefCallback} from 'react'
import {twMerge} from 'tailwind-merge'
import type {DisabledProps} from '../types.js'

interface Props extends StyledPropsWithChildren, DisabledProps {
  id: string
  ref?: RefCallback<HTMLElement>
  isActive: boolean
  isFocusable?: boolean
  title?: ReactNode
  onClick: () => void
}

export const Outer = ({className, children, ...props}: Props) => (
  <Button
    {...props}
    className={twMerge('w-full pr-2.75 text-center', className)}>
    {children}
  </Button>
)
