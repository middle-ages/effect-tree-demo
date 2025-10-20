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
        'px-2 flex flex-col fill-container-h overflow-hidden set-fg-control',
        className,
      )}
      {...{style}}>
      <div className="h-9 *:leading-9">{header}</div>
      <div className={`flex-gap flex-1 mb-1.5`}>
        <div className="p-2 dark-col">
          {stats}
          <Separator spacing={[3, 3 + 1 / 2]} />
          {toolbar}
          <Separator spacing={3 + 1 / 2} />
          {stylePanel}
        </div>
        <div className="flex-1 size-container">{view}</div>
      </div>
      <div className="h-20 dark-col">{footer}</div>
    </div>
  )
}
