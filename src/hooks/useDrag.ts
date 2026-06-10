import {subscribe} from './observable/helpers'
import {noop} from '#Function'
import {pipe, PointPx} from '#util'
import {useBoolean} from '#useBoolean'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {
  dragObservable,
  matchDrag,
  type DragMove as _DragMove,
  type DragNotification,
} from './observable/drag'

export type DragMove = _DragMove

export interface UseDrag extends DragMove {
  isDragging: boolean
}

export const useDrag = (
  onDrag: (notification: DragMove) => void = noop,
): [UseDrag, ref: RefCallback<HTMLElement>] => {
  const [state, setState] = useState<DragMove>({
    ...PointPx.zero,
    delta: PointPx.zero,
    pan: PointPx.zero,
  })

  const {flag: isDragging, setOn: onStart, setOff: onStop} = useBoolean()

  const ref = useCallback(
    (element: HTMLElement | null): (() => void) => {
      if (element === null) {
        return noop
      }

      const observable: rx.Observable<DragNotification> = pipe(
        element,
        dragObservable(),
        rx.tap(
          matchDrag({
            onStop,
            onMove: current => {
              onStart()
              setState(previous =>
                PointPx.equals(previous, current) ? previous : current,
              )

              onDrag(current)
            },
          }),
        ),
      )

      return subscribe(observable)
    },
    [onDrag, onStart, onStop],
  )

  return [{...state, isDragging}, ref]
}
