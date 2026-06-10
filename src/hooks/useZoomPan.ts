import {type DragMove, useDrag} from '#useDrag'
import {useMergeRefPair} from '#useMergeRefs'
import {useZoom} from '#useZoom'
import {pipe, PointPx} from '#util'
import {useCallback, useState, type RefCallback} from 'react'

interface UseZoomPan {
  isDragging: boolean
  scale: number
  translatePx: PointPx
  ref: RefCallback<HTMLElement>
  reset: () => void
}

export const useZoomPan = (init = PointPx.zero): UseZoomPan => {
  const [{scale, resetScale, ...zoomPointPx}, zoomRef] = useZoom()

  const [pan, setPan] = useState(init)

  const onDrag = useCallback(({delta}: DragMove): void => {
    setPan(old => {
      const {xPx, yPx} = pipe(old, PointPx.add(delta))
      return {xPx, yPx}
    })
  }, [])

  const reset = useCallback(() => {
    resetScale()
    setPan(init)
  }, [init, resetScale])

  const [{isDragging}, panRef] = useDrag(onDrag)

  const translatePx = pipe(zoomPointPx, PointPx.add(pan))

  return {
    reset,
    isDragging,
    scale,
    translatePx,
    ref: useMergeRefPair(zoomRef, panRef),
  }
}
