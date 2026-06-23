import type {ReactNode} from 'react'
import {type StyledProps} from '#util'
import {SplitPanel} from '#SplitPanel'
import {twMerge} from 'tailwind-merge'
import {HRule} from '#HRule'
import {withClassName} from '#compinators'
import type {Pair} from '#Pair'

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

const minWidthsPx: Pair<number> = [340, 280]

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
  <div
    className={twMerge(
      'flex h-cqh flex-col pr-0.5 pl-1 contain-strict',
      className,
    )}
    {...{style}}>
    {/** Header */}
    {header}

    {/** Body */}
    <SplitPanel
      {...{minWidthsPx}}
      className='flex-1 contain-strict'
      leftClassName='pr-[1.5px] flex-gap-col contain-strict'
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

const VerticalPanel = withClassName.div('dark-col rounded-md p-1')
