import type {NonEmptyArray} from '#Array'
import {Pill} from '#Pill'
import type {VoidAction} from '#types'
import type {PrimedActionMap} from './types'

interface Props {
  actions: PrimedActionMap
}

export const Toolbar = ({actions: {code, nodeCount, random}}: Props) => {
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-2">
      <Row actions={code} label="Prüfer code" />
      <Row actions={nodeCount} label="Node count" />
      <Row actions={random} label="Random jumps" />
    </div>
  )
}

const Row = ({
  actions,
  label,
}: {
  actions: NonEmptyArray<VoidAction>
  label: string
}) => (
  <div
    className={`form-row-h grid grid-cols-subgrid col-span-2 h-7
                *:last:self-center *:truncate`}>
    <div className="set-fg-control">{label}</div>
    <Pill {...{actions}} />
  </div>
)
