import {monoRecord} from '#Record'
import {PointPx} from '#react/point'
import {pipe} from '#Function'
import {type WheelEvent} from 'react'
import * as rx from 'rxjs'

export interface WheelNotification extends PointPx {
  direction: -1 | 0 | 1
  factor: number
}

export interface WheelSettings {
  friction: number
}

const defaultSettings = {
  friction: 1,
}

export const wheelObservable =
  (settings?: Partial<WheelSettings>) =>
  (element: HTMLElement): rx.Observable<WheelNotification> => {
    const {friction = defaultSettings.friction} = settings ?? defaultSettings
    return pipe(
      rx.fromEvent<WheelEvent<HTMLElement>>(element, 'wheel', {
        passive: true,
      }),
      rx.timeInterval(),
      rx.map(({interval, value}) => ({
        ...PointPx.fromWheelEvent(value),
        direction: (-1 * Math.sign(value.deltaY)) as -1 | 0 | 1,
        factor: 10 / (friction * interval),
      })),
    )
  }

const zero: WheelNotification = {
  ...PointPx.zero,
  ...monoRecord(0)('direction', 'factor'),
}

wheelObservable.zero = zero
