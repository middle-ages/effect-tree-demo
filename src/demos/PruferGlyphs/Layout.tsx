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
        'px-2 flex flex-col cqh-px overflow-hidden',
        className,
      )}
      {...{style}}>
      {header}
      <div className={`min-h-0 flex gap-2 flex-1`}>
        <div className="w-96 flex flex-col rounded-lg set-bg-dark p-2 overflow-hidden">
          {stats}
          <div className="separator mt-1 mb-1.5" />
          {toolbar}
          <div className="separator mt-2 mb-[7px]" />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      <div className="set-bg-light relative z-1 shrink-0">
        <div className="separator opacity-25" />
        {footer}
      </div>
    </div>
  )
}
