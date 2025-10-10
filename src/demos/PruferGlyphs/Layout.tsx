import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props
  extends StyledProps,
    Record<
      'header' | 'footer' | 'view' | 'toolbar' | 'stats' | 'stylePanel',
      ReactNode
    > {}

export const Layout = ({
  header,
  footer,
  view,
  toolbar,
  stats,
  stylePanel,
  className,
  style,
}: Props) => {
  return (
    <div
      className={twMerge(
        'px-2 flex flex-col h-[100cqh] overflow-hidden',
        className,
      )}
      {...{style}}>
      {header}
      <div className={`min-h-0 flex gap-2 flex-1 mb-1`}>
        <div className="w-96 flex flex-col rounded-lg">
          {stats}
          <div className="separator mt-2 mb-1" />
          {toolbar}
          <div className="separator mt-2 mb-[7px]" />
          {stylePanel}
        </div>
        <div className="pt-0.5 flex-1 size-container">{view}</div>
      </div>
      <div className="set-bg-light relative z-1">
        <div className="separator opacity-30" />
        {footer}
      </div>
    </div>
  )
}
