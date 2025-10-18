import type {ReactNode} from 'react'
import type {StyledProps} from '#util'
import {twMerge} from 'tailwind-merge'
import {Separator} from '#Separator'

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
        'px-2 flex-gap-col h-screen overflow-hidden',
        className,
      )}
      {...{style}}>
      {header}
      <div className={`flex gap-1.5 flex-1`}>
        <div className="flex flex-col rounded-lg set-bg-dark p-2">
          {stats}
          <Separator spacing={[3, 3 + 1 / 2]} />
          {toolbar}
          <Separator spacing={3 + 1 / 2} />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      {footer}
    </div>
  )
}
