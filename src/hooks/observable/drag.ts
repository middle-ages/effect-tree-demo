import {fromMouseUp, fromPointerDown, isButtonDown} from '#pointer'
import {pipe, PointPx} from '#util'
import {type PointerEvent} from 'react'
import * as rx from 'rxjs'

export interface DragMove extends PointPx {
  delta: PointPx
  pan: PointPx
}

export type DragNotification = DragMove | 'stop'

export const dragObservable =
  () =>
  (element: HTMLElement): rx.Observable<DragNotification> => {
    const down = pipe(
      element,
      fromPointerDown,
      rx.filter(isButtonDown('primary')),
      rx.tap(({target, pointerId}) => {
        ;(target as HTMLElement).setPointerCapture(pointerId)
      }),
    )

    const move = pipe(
      rx.fromEvent<PointerEvent<HTMLElement>>(element, 'pointermove'),
      rx.skipUntil(down),
      rx.takeUntil(fromMouseUp(element)),
    )

    const slow = pipe(
      move,
      rx.throttleTime(30, undefined, {leading: true, trailing: true}),
    )

    return pipe(
      slow,
      rx.map(event => ({
        ...PointPx.fromMouseEvent(event),
        delta: PointPx.zero,
        pan: PointPx.zero,
      })),
      rx.startWith(),
      rx.scan((previous: DragMove | undefined, current: DragMove): DragMove => {
        if (previous === undefined) {
          return current
        }
        const delta = PointPx.delta(current, previous)
        return {...current, delta, pan: PointPx.add(previous.pan)(delta)}
      }),
      rx.endWith('stop' as const),
      rx.repeat(),
    )
  }

export const matchDrag =
  <R>({onMove, onStop}: {onMove: (move: DragMove) => R; onStop: () => R}) =>
  (drag: DragNotification): R =>
    typeof drag === 'string' ? onStop() : onMove(drag)
