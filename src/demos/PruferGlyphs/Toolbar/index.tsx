import {type PropsWithChildren} from 'react'
import {twMerge} from 'tailwind-merge'
import type {CodeStateEffect} from '../hooks/types.js'
import {DecIncJumps} from './DecIncJumps'
import {RandomJumps} from './RandomJumps'

const rowHeight = 'h-row-small'
const rowLineHeight = 'leading-row-small'

export const Toolbar = ({code, setCode}: CodeStateEffect) => (
  <div className="w-full grid grid-cols-[11ch_1fr]">
    <Row
      label="Prüfer code"
      title="Jump between different codes at the current node count.">
      <DecIncJumps jump="code" {...{code, setCode}} />
    </Row>
    <Row
      label="Node count"
      title="Jump to between trees with different node counts.">
      <DecIncJumps jump="nodeCount" {...{code, setCode}} />
    </Row>
    <Row label="Randomize" title="Jump to random trees.">
      <RandomJumps {...{code, setCode}} />
    </Row>
  </div>
)

const Row = ({
  label,
  title,
  children,
}: PropsWithChildren<{label: string; title: string}>) => (
  <div className="h-fit subgrid-2 select-none">
    <div className={twMerge('text-fg-control', rowLineHeight)} {...{title}}>
      {label}
    </div>
    <div className={twMerge('flex-center', rowHeight)}>{children}</div>
  </div>
)
