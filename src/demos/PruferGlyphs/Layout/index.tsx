import type {ReactNode} from 'react'
import {type StyledProps} from '#util'
import {SplitPanel} from '#SplitPanel'
import {twMerge} from 'tailwind-merge'
import {Separator} from '#Separator'

interface Props
  extends StyledProps,
    Record<
      | 'header'
      | 'footer'
      | 'view'
      | 'toolbar'
      | 'stats'
      | 'stylePanel'
      | 'graphPanel',
      ReactNode
    > {}

export const Layout = ({
  header,
  footer,
  view,
  toolbar,
  stats,
  stylePanel,
  graphPanel,
  className,
  style,
}: Props) => (
  <div
    {...{style}}
    className={twMerge('flex flex-col h-cqh overflow-hidden px-2', className)}>
    {/** Header */}
    {header}

    {/** Body */}
    <SplitPanel
      className="flex-1 min-h-12"
      parentPaddingPx={8 * 2}
      //minLeftWidth={rch(37)}
      minLeftWidthPx={400}
      leftClassName="flex-gap-col"
      rightClassName={`flex-1 min-h-[4lh] focusable
                       rounded-md bg-paper border-2 inset-xy
                       scrollable-y [&::after]:top-full`}
      rightStyle={{scrollbarGutter: 'stable'}}
      left={
        <>
          <div className="no-flex dark-col rounded-md px-2 py-1.5">
            {stats}
            {Separator}
            {toolbar}
            {Separator}
            {stylePanel}
          </div>
          <div
            className={`flex-1 size-full overflow-hidden min-h-[2lh]
                        rounded-md bg-paper border-2 inset-xy
                        size-container`}>
            {graphPanel}
          </div>
        </>
      }
      right={view}
    />

    {/** Footer */}
    <div className="my-1.5 dark-col z-1 px-2 pb-1">{footer}</div>
    {/*
    <div className="absolute-full typo" />
   */}
  </div>
)
