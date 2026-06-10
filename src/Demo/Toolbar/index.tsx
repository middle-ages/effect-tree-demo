import {type PropsWithChildren} from 'react'
import {CodeJumps} from './CodeJumps'
import {NodeCountJumps} from './NodeCountJumps'
import {RandomJumps} from './RandomJumps'

export const Toolbar = () => (
  <div className='grid h-21 w-full auto-rows-[calc(7*var(--spacing))] grid-cols-[9.5ch_1fr] contain-strict'>
    <Row
      key='0'
      label='Prüfer code'
      title='Jump between different codes at the current node count.'>
      <CodeJumps />
    </Row>
    <Row
      key='1'
      label='Node count'
      title='Jump between trees with different node counts.'>
      <NodeCountJumps />
    </Row>
    <Row key='2' label='Randomize' title='Jump to random trees.'>
      <RandomJumps />
    </Row>
  </div>
)

const Row = ({
  label,
  title,
  children,
}: PropsWithChildren<{label: string; title: string}>) => (
  <div className='subgrid-2 h-row-small w-full items-center contain-size *:last:mt-px'>
    <div
      className='h-row-small w-full leading-row-small text-fg-control contain-strict select-none'
      {...{title}}>
      {label}
    </div>
    <div className='h-row-small w-full content-center contain-strict'>
      {children}
    </div>
  </div>
)
