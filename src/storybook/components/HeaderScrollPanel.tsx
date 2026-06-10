import {type StyledPropsWithChildren} from '#util'
import type {ReactNode} from 'react'
import {twMerge} from 'tailwind-merge'
import {ScrollPanel} from '#ScrollPanel'

interface Props extends StyledPropsWithChildren {
  header: ReactNode
  scrollPanelClassName?: string
}

const headerLeading = 'leading-7'
const scrollableHeight = 'h-[calc(100cqh-7*var(--spacing))]'

export const HeaderScrollPanel = ({
  header,
  children,
  style,
  className,
  scrollPanelClassName,
}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge('flex-col overflow-hidden px-1', className)}>
      <h1 className={twMerge('text-center text-fg-control', headerLeading)}>
        {header}
      </h1>
      <div
        className={twMerge(
          'size-container w-[100%-2*var(--spacing)] flex-1 p-1',
          scrollableHeight,
        )}>
        <ScrollPanel className={scrollPanelClassName}>{children}</ScrollPanel>
      </div>
    </div>
  )
}
