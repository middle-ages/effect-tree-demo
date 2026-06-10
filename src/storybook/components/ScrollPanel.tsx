import {type StyledPropsWithChildren} from '#util'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  header: ReactNode
}

const scrollableHeight = 'h-[calc(100%-7*var(--spacing))]'

export const ScrollPanel = ({header, children, style, className}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge(
        'px-2 bg-light fill-container overflow-hidden',
        className,
      )}>
      <h1 className="text-center text-fg-contrtol leading-7">{header}</h1>
      <div
        className={twMerge(
          scrollableHeight,
          'bg-control scrollable-y border rounded-md',
          'border-line-light [&::after]:bottom-0',
        )}>
        {children}
      </div>
    </div>
  )
}
