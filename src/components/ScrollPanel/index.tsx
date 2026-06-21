import type {StyledPropsWithChildren} from '#react'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {}

export const ScrollPanel = ({className, style, children}: Props) => (
  <div className={twMerge('scrollable-xy', className)} {...{style}}>
    <Row>{children}</Row>
  </div>
)

const Row = ({children}: {children: ReactNode}) => (
  <div className='flex'>
    <div className='shadow-left' />
    {children}
    <div className='shadow-right' />
  </div>
)
