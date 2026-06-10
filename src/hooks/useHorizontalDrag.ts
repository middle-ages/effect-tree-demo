import {noop, pipe} from '#Function'
import {roundEquivalence} from '#react/size'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {
  emptyDragMove,
  horizontalDragObservable,
  matchDrag,
  type DragMove,
} from './observable/horizontalDrag'

export const useHorizontalDrag = (
  onDrag: (notification: DragMove) => void = noop,
): [DragMove, ref: RefCallback<HTMLElement>] => {
  const [state, setState] = useState(emptyDragMove)
  const ref = useCallback(
    (element: HTMLElement | null): (() => void) =>
      element === null
        ? noop
        : pipe(
            element,
            horizontalDragObservable(),
            rx.tap(
              matchDrag({
                onStop: noop,
                onMove: current => {
                  setState(previous => {
                    const resolved = roundEquivalence()(
                      previous.xPx,
                      current.xPx,
                    )
                      ? previous
                      : current
                    onDrag(resolved)
                    return resolved
                  })
                },
              }),
            ),
            subscribe,
          ),
    [onDrag],
  )

  return [state, ref]
}
