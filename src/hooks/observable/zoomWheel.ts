import {numberClamp} from '#Number'
import {fromDoubleClick} from '#pointer'
import {mergeWith} from '#Record'
import {pipe, ScaledPointPx} from '#util'
import * as rx from 'rxjs'
import {wheelObservable, type WheelNotification} from './wheel'

export interface ZoomNotification extends WheelNotification {
  scale: number
}

const minScale = 2 / 3
const maxScale = 6

const clampScale = numberClamp(minScale, maxScale)

//
export const zoomWheelObservable = (
  element: HTMLElement,
): rx.Observable<ZoomNotification> =>
  pipe(
    element,
    wheelObservable({friction: 6}),
    rx.startWith(wheelObservable.zero),
    rx.map(mergeWith({scale: 1})),
    rx.scan((old, {direction, xPx, yPx, factor, ...current}) => {
      const {scale: oldScale = 1} = old
      const unclampedScale = (1 + direction * factor) * oldScale
      const scale = clampScale(unclampedScale)

      return {
        ...current,
        factor,
        direction,
        ...(scale === unclampedScale
          ? // There was no clamping of scale
            ScaledPointPx.scale({xPx, yPx, scale})
          : {xPx: old.xPx, yPx: old.yPx, scale}),
      }
    }),
    rx.takeUntil(fromDoubleClick(element)),
    rx.repeat(),
  )
