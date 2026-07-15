import {type PropsWithChildren} from 'react'
import {CodeJumps} from './CodeJumps'
import {NodeCountJumps} from './NodeCountJumps'
import {RandomJumps} from './RandomJumps'
import {twMerge} from 'tailwind-merge'

const rowCount = 3
const rowHeightSpacing = 7

const rowHeightExpression = `(${rowHeightSpacing.toFixed(2)} * var(--spacing))`
const rowHeight = `calc(${rowHeightExpression})`
const totalHeight = `calc(${rowCount.toString()} * ${rowHeightExpression})`
const rowStyle = {height: rowHeight}
const cellClassName = 'w-full contain-strict'

export const Toolbar = () => (
  <div
    className='grid w-full grid-cols-[7ch_1fr] contain-strict'
    style={{gridAutoRows: rowHeight, height: totalHeight}}>
    <Row
      key='0'
      label='Code'
      title='Jump between different codes at the current node count.'>
      <CodeJumps />
    </Row>
    <Row
      key='1'
      label='Nodes'
      title='Jump between trees with different node counts.'>
      <NodeCountJumps />
    </Row>
    <Row key='2' label='Random' title='Jump to random trees.'>
      <RandomJumps />
    </Row>
  </div>
)

const Row = ({
  label,
  title,
  children,
}: PropsWithChildren<{label: string; title: string}>) => (
  <div className='subgrid-2 w-full items-center contain-size *:last:mt-px'>
    <div
      className={twMerge(cellClassName, 'leading-row-small select-none')}
      style={rowStyle}
      {...{title}}>
      {label}
    </div>
    <div style={rowStyle} className={twMerge(cellClassName, 'content-center')}>
      {children}
    </div>
  </div>
)
