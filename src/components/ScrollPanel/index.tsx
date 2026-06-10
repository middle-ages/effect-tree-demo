import type {StyledPropsWithChildren} from '#react/props'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  tabIndex?: number
}

export const ScrollPanel = ({
  tabIndex = -1,
  className,
  style,
  children,
}: Props) => (
  <div
    {...{tabIndex, style}}
    className={twMerge('scrollable-xy dom-play', className)}>
    <Row>{children}</Row>
  </div>
)

const Row = ({children}: {children: ReactNode}) => (
  <div className='flex dom-play'>
    <div className='shadow-left' />
    {children}
    <div className='shadow-right' />
  </div>
)
