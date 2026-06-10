import {pipe, type LazyArg} from '#Function'
import {fromMouseUp, fromPointerDown, isButtonDown} from '#pointer'
import {PointPx} from '#react/point'
import {type PointerEvent} from 'react'
import * as rx from 'rxjs'

export type PointerObservable = rx.Observable<PointerEvent<HTMLElement>>
export type DragObservable = rx.Observable<DragNotification>

export interface DragMove extends PointPx {
  delta: PointPx
  pan: PointPx
}

export type DragNotification = DragMove | 'stop'

export const dragMoveDelta = <O extends PointPx>(
  previous: O,
  current: O,
): O => ({
  ...current,
  delta: PointPx.delta(current, previous),
})

export const pointerDown: (
  element: HTMLElement,
) => PointerObservable = element =>
  pipe(
    element,
    fromPointerDown,
    rx.filter(isButtonDown('primary')),
    rx.tap(({target, pointerId}) => {
      ;(target as HTMLElement).setPointerCapture(pointerId)
    }),
  )

export const pointerMove =
  (element: HTMLElement) =>
  <O extends PointerEvent<HTMLElement>>(down: rx.Observable<O>): typeof down =>
    pipe(
      rx.fromEvent<O>(element, 'pointermove'),
      rx.skipUntil(down),
      rx.takeUntil(fromMouseUp(element)),
      rx.throttleTime(20, undefined, {leading: true, trailing: true}),
    )

const eventToNotification = (
  event: PointerEvent<HTMLElement>,
): PointPx & Record<'delta' | 'pan', PointPx> => ({
  ...PointPx.fromMouseEvent(event),
  delta: PointPx.zero,
  pan: PointPx.zero,
})

export const dragObservable: LazyArg<
  (element: HTMLElement) => DragObservable
> = () => element =>
  pipe(
    element,
    pointerDown,
    pointerMove(element),
    rx.map(eventToNotification),
    rx.scan((previous: DragMove, current: DragMove): DragMove => {
      const {delta, ...rest} = dragMoveDelta(previous, current)
      const pan = PointPx.add(previous.pan)(delta)
      return {...rest, delta, pan}
    }),
    rx.endWith('stop' as const),
    rx.repeat(),
  )

export const matchDrag =
  <Move, Result>({
    onMove,
    onStop,
  }: {
    onMove: (move: Move) => Result
    onStop: () => Result
  }) =>
  (notification: Move | 'stop'): Result =>
    typeof notification === 'string' ? onStop() : onMove(notification)
