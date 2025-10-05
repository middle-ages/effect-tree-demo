import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props
  extends StyledProps,
    Record<'header' | 'footer' | 'view' | 'stats' | 'toolbar', ReactNode> {}

export const Layout = ({
  header,
  footer,
  view,
  stats,
  toolbar,
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
          w-[50rch] overflow-hidden
          flex flex-col p-2
          bg-[var(--toolbar)] rounded-lg`}>
          {toolbar}
          {stats}
        </div>
        {view}
      </div>
      {footer}
    </div>
  )
}
