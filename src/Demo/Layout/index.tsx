import type {ReactNode} from 'react'
import {type StyledProps} from '#util'
import {SplitPanel} from '#SplitPanel'
import {twMerge} from 'tailwind-merge'
import {HRule} from '#HRule'
import {withClassName} from '#compinators'

interface Props
  extends
    StyledProps,
    Record<
      | 'header'
      | 'footer'
      | 'content'
      | 'toolbar'
      | 'stats'
      | 'stylePanel'
      | 'graphPanel',
      ReactNode
    > {}

export const Layout = ({
  header,
  footer,
  content,
  toolbar,
  stats,
  stylePanel,
  graphPanel,
  className,
  style,
}: Props) => (
  <div className={twMerge('flex h-cqh flex-col px-1', className)} {...{style}}>
    {/** Header */}
    {header}

    {/** Body */}
    <SplitPanel
      className='flex-1'
      minWidthsPx={[350, 280]}
      leftClassName='pr-px flex-gap-col'
      rightClassName='min-h-[4lh] size-container overflow-hidden'
      left={
        <>
          <VerticalPanel>
            {stats}
            {HRule}
            {toolbar}
          </VerticalPanel>
          <div className='size-container min-h-lh flex-1 overflow-hidden rounded-md border-inset-2 bg-paper'>
            {graphPanel}
          </div>
          <VerticalPanel>{stylePanel}</VerticalPanel>
        </>
      }
      right={content}
    />

    {/** Footer */}
    <div className='h-20 pr-px'>{footer}</div>
  </div>
)

const VerticalPanel = withClassName.div('dark-col rounded-md p-1.5')
