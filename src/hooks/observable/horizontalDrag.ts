import {flow, pipe, type LazyArg} from '#Function'
import {applyPair, fanout} from '#Pair'
import {PointPx} from '#react/point'
import {pick} from 'effect/Struct'
import {type PointerEvent} from 'react'
import * as rx from 'rxjs'
import * as drag from './drag'

export type DragObservable = rx.Observable<DragNotification>

export const matchDrag = drag.matchDrag

export const initPropNames = ['adjustPx'] as const
const pickInit = pick(...initPropNames)
type InitPropName = (typeof initPropNames)[number]
type InitProps = Record<InitPropName, number>

interface DragEvent extends PointerEvent<HTMLElement>, InitProps {}

export interface DragMove extends InitProps, PointPx {
  delta: PointPx
}

export type DragNotification = DragMove | 'stop'

export const emptyDragMove: DragMove = {
  ...PointPx.zero,
  delta: PointPx.zero,
  adjustPx: 0,
}

export const horizontalDragObservable: LazyArg<
  (element: HTMLElement) => DragObservable
> = () => element =>
  pipe(
    element,
    drag.pointerDown,
    rx.map(annotatePointerDown(element)),
    fanout(drag.pointerMove(element), flow(rx.take(1), combineEvents)),
    applyPair,
    rx.map(eventToNotification),
    rx.scan(drag.dragMoveDelta),
    rx.endWith('stop' as const),
    rx.repeat(),
  )

const combineEvents =
  (down: rx.Observable<DragEvent>) =>
  (move: drag.PointerObservable): typeof down =>
    pipe(
      rx.combineLatest([down, move]),
      rx.map(([down, move]) => ({
        ...move,
        ...pick(move, 'clientX', 'clientY'),
        ...pickInit(down),
      })),
    )

const eventToNotification = (event: DragEvent): DragMove => ({
  ...pickInit(event),
  ...PointPx.fromMouseEvent(event),
  delta: PointPx.zero,
})

const annotatePointerDown =
  (element: HTMLElement) =>
  (event: PointerEvent<HTMLElement>): DragEvent => ({
    ...event,
    adjustPx:
      event.clientX -
      element.getBoundingClientRect().left -
      element.clientWidth,
  })
