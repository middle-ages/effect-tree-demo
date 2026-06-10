import {noop} from '#Function'
import {pipe, PointPx, ScaledPointPx, type Dispatcher} from '#util'
import {useCallback, useState, type RefCallback} from 'react'
import * as rx from 'rxjs'
import {subscribe} from './observable/helpers'
import {zoomWheelObservable} from './observable/zoomWheel'

export const useZoom = (): [
  ScaledPointPx & {
    setZoomState: Dispatcher<ScaledPointPx>
    resetScale: () => void
  },
  ref: RefCallback<HTMLElement>,
] => {
  const [state, setState] = useState({scale: 1, ...PointPx.zero})

  const ref = useCallback<(element: HTMLElement | null) => () => void>(
    element =>
      element === null
        ? noop
        : pipe(
            element,
            zoomWheelObservable,
            rx.tap(current => {
              setState(previous =>
                ScaledPointPx.equals(current, previous) ? previous : current,
              )
            }),
            subscribe,
          ),
    [],
  )

  const resetScale = useCallback(() => {
    setState(ScaledPointPx.zero)
  }, [])

  return [{...state, setZoomState: setState, resetScale}, ref]
}
