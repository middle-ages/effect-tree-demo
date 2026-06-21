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
      leftClassName='pr-[1.5px] flex-gap-col'
      rightClassName='p-px pr-0.5 min-h-[4lh] size-container'
      left={
        <>
          <VerticalPanel>
            {stats}
            {HRule}
            {toolbar}
          </VerticalPanel>
          <div className='size-container flex-1 *:rounded-md *:border-inset-2'>
            {graphPanel}
          </div>
          <VerticalPanel>{stylePanel}</VerticalPanel>
        </>
      }
      right={content}
    />

    {/** Footer */}
    <div className='h-20'>{footer}</div>
  </div>
)

const VerticalPanel = withClassName.div('dark-col rounded-md p-1.5')
