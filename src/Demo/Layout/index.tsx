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
  <div className={twMerge('flex h-cqh flex-col', className)} {...{style}}>
    {/** Header */}
    {header}

    {/** Body */}
    <SplitPanel
      className='-mt-0.5 flex-1 px-1'
      minWidthsPx={[380, 280]}
      leftClassName='flex-gap-col pr-0.5'
      rightClassName='min-h-[4lh] size-container overflow-hidden'
      left={
        <>
          <VerticalPanel>
            {stats}
            {HRule}
            {toolbar}
          </VerticalPanel>
          <div className='size-container min-h-[2lh] flex-1 overflow-hidden rounded-md border-inset-2 bg-paper'>
            {graphPanel}
          </div>
          <VerticalPanel className='-mt-0.5'>{stylePanel}</VerticalPanel>
        </>
      }
      right={content}
    />

    {/** Footer */}
    <div className='mx-1.5 my-1 ml-1'>{footer}</div>
  </div>
)

const VerticalPanel = withClassName.div('dark-col rounded-md p-1.5')
