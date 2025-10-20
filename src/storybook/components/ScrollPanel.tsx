import {type StyledPropsWithChildren} from '#util'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  header: ReactNode
}

const scrollableHeight = 'h-[calc(100%-_var(--headerHeight))]'

export const ScrollPanel = ({header, children, style, className}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge(
        'px-2 set-bg-light fill-container overflow-hidden',
        className,
      )}>
      <h1>{header}</h1>
      <div
        className={twMerge(
          scrollableHeight,
          'set-bg-control scrollable-y',
          'set-light-border rounded-md [&::after]:bottom-0',
        )}>
        <div className="p-2">{children}</div>
      </div>
    </div>
  )
}
