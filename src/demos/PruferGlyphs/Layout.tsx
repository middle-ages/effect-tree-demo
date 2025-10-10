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
      className={twMerge('h-[calc(100vh_-_0.5px)] flex flex-col', className)}
      {...{style}}>
      {header}
      <div className="min-h-0 flex gap-3 p-1 flex-1">
        <div
          className={`
          w-[50rch] overflow-hidden flex flex-col p-2
          bg-[var(--toolbar)] rounded-lg`}>
          {toolbar}
          <div className="separator mt-2 mb-1" />
          {stats}
          <div className="separator mb-2" />
          {stylePanel}
        </div>
        {view}
      </div>
      {footer}
    </div>
  )
}
