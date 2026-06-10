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

/*



    <div
      className={twMerge(
        'yyy relative bottom-0 left-0 -translate-y-4',
        'events-none z-10 hidden h-4 w-full bg-red-500',
      )}
    />
      p
  .yyy {
    @container scroll-state(scrollable: right) {
      display: none;
    }
    @container scroll-state(scrollable: left) {
      display: none;
    }
  }

    */
