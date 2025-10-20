import {Pill} from '#Pill'
import type {Tuple3} from '#Tuple'
import type {MouseListener, VoidAction} from '#types'
import {
  useMemo,
  useState,
  type PropsWithChildren,
  type PointerEvent,
} from 'react'
import {type PrimedActionMap} from './types'

type State = 'active' | undefined

interface Props {
  actions: PrimedActionMap
}

export const Toolbar = ({actions: {code, nodeCount, random}}: Props) => {
  const [state, setState] = useState<State>()
  const isActive = state === 'active'

  const listener: MouseListener = useMemo(
    () => ({
      onPointerDown: (event: PointerEvent): void => {
        setCapture(event)
        setState('active')
      },
      onPointerUp: (event: PointerEvent): void => {
        releaseCapture(event)
        setState(undefined)
      },
    }),
    [],
  )

  return (
    <div className="w-full grid grid-cols-[11ch_1fr]">
      <Row label="Prüfer code">
        <Pill actions={code} />
      </Row>
      <Row label="Node count">
        <Pill actions={nodeCount} />
      </Row>
      <Row label="Randomize">
        <Pill.MultiPress
          {...{listener, isActive}}
          actions={random as unknown as Tuple3<VoidAction>}
        />
      </Row>
    </div>
  )
}

const Row = ({children, label}: PropsWithChildren<{label: string}>) => (
  <div className="form-row-h grid grid-cols-subgrid col-span-2">
    <div className="set-fg-control leading-8">{label}</div>
    <div className="flex-center">{children}</div>
  </div>
)

function setCapture(event: PointerEvent): void {
  const target = event.target as HTMLElement
  target.setPointerCapture(event.pointerId)
}

function releaseCapture(event: PointerEvent): void {
  const target = event.target as HTMLElement
  target.releasePointerCapture(event.pointerId)
}
