import {type PropsWithChildren} from 'react'
import {twMerge} from 'tailwind-merge'
import {DecIncJumps} from './DecIncJumps'
import {RandomJumps} from './RandomJumps'

const rowHeight = 'h-row-small'
const rowLineHeight = 'leading-row-small'

export const Toolbar = () => (
  <div className='grid h-22 w-full grid-cols-[9ch_1fr] gap-x-1 gap-y-0.5 pr-px contain-strict'>
    <Row
      label='Prüfer code'
      title='Jump between different codes at the current node count.'>
      <DecIncJumps target='code' />
    </Row>
    <Row
      label='Node count'
      title='Jump to between trees with different node counts.'>
      <DecIncJumps target='nodeCount' />
    </Row>
    <Row label='Randomize' title='Jump to random trees.'>
      <RandomJumps />
    </Row>
  </div>
)

const Row = ({
  label,
  title,
  children,
}: PropsWithChildren<{label: string; title: string}>) => (
  <div className='subgrid-2 h-7 w-full contain-strict'>
    <div
      className={twMerge('text-fg-control contain-strict', rowLineHeight)}
      {...{title}}>
      {label}
    </div>
    <div className={twMerge('flex-center contain-strict', rowHeight)}>
      {children}
    </div>
  </div>
)
